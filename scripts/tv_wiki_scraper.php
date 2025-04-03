<?php
// scripts/tv_wiki_scraper.php
set_time_limit(600); // 10 minutes

// Initialize logging
class Logger {
    private $logFile;
    private $startTime;
    
    public function __construct($logFile = 'scraper_log.txt') {
        $this->logFile = $logFile;
        $this->startTime = microtime(true);
        $this->info("=== Starting scraper ===");
    }
    
    public function info($message) {
        $this->log('INFO', $message);
    }
    
    public function error($message) {
        $this->log('ERROR', $message);
    }
    
    public function success($message) {
        $this->log('SUCCESS', $message);
    }
    
    private function log($level, $message) {
        $timestamp = date('[Y-m-d H:i:s]');
        $elapsed = round(microtime(true) - $this->startTime, 2);
        $logMessage = "$timestamp [$level] ($elapsed s) $message\n";
        
        // Write to log file
        file_put_contents($this->logFile, $logMessage, FILE_APPEND);
        
        // Also output to console
        echo $logMessage;
    }
}

// Initialize the logger
$logger = new Logger('tv_wiki_scraper.log');

// Database connection
try {
    require_once "../config.php";
    $logger->info("Database connection established");
} catch (Exception $e) {
    $logger->error("Database connection failed: " . $e->getMessage());
    exit;
}

// Create the tv_shows table if it doesn't exist
$createTableSQL = "CREATE TABLE IF NOT EXISTS tv_shows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_year INT,
    end_year INT,
    creator VARCHAR(255),
    network VARCHAR(255),
    genre VARCHAR(255),
    num_seasons INT,
    status VARCHAR(50),
    description TEXT,
    wiki_url VARCHAR(255),
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (title, start_year)
)";

try {
    $conn->query($createTableSQL);
    $logger->info("TV shows table created or already exists");
} catch (Exception $e) {
    $logger->error("Failed to create table: " . $e->getMessage());
    exit;
}

// Function to scrape a Wikipedia list page
function scrapeWikipediaList($url, $conn, $logger) {
    $logger->info("Scraping: $url");
    
    // Initialize cURL session
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'MediaTracker/1.0 (your-email@example.com)');
    
    // Execute cURL session
    $html = curl_exec($ch);
    
    // Check for cURL errors
    if (curl_errno($ch)) {
        $logger->error("cURL Error: " . curl_error($ch));
        curl_close($ch);
        return 0;
    }
    
    curl_close($ch);
    
    // Create a new DOM Document
    $dom = new DOMDocument();
    
    // Suppress warnings from malformed HTML
    @$dom->loadHTML($html);
    
    // Create a new DOMXPath object
    $xpath = new DOMXPath($dom);
    
    // Find all tables with class 'wikitable'
    $tables = $xpath->query("//table[contains(@class, 'wikitable') or contains(@class, 'sortable')]");
    
    if ($tables->length === 0) {
        $logger->info("No wikitables found, trying alternate selectors");
        $tables = $xpath->query("//table");
        
        if ($tables->length > 0) {
            $logger->info("Found " . $tables->length . " tables using generic selector");
        }
    }
    
    $logger->info("Found " . $tables->length . " tables on the page");
    $showCount = 0;
    
    // Process each table
    foreach ($tables as $tableIndex => $table) {
        // Get table rows, skip header row
        $rows = $xpath->query(".//tr", $table);
        $logger->info("Table #" . ($tableIndex + 1) . " has " . $rows->length . " rows");
        
        // Skip the first row (header)
        $headerRow = true;
        
        foreach ($rows as $rowIndex => $row) {
            if ($headerRow) {
                $headerRow = false;
                continue;
            }
            
            // Get cells in the row
            $cells = $xpath->query(".//td", $row);
            
            // Skip rows that don't have enough cells
            if ($cells->length < 3) {
                continue;
            }
            
            // Extract TV show data
            $title = trim($cells->item(0)->textContent);
            
            // Remove references like [1] from the title
            $title = preg_replace('/\[\d+\]/', '', $title);
            
            // Extract years (if available)
            $years = trim($cells->item(1)->textContent);
            $yearPattern = '/(\d{4})(?:\s*[-–—]\s*(\d{4}|\w+))?/';
            
            $startYear = null;
            $endYear = null;
            
            if (preg_match($yearPattern, $years, $matches)) {
                $startYear = $matches[1];
                $endYear = (isset($matches[2]) && is_numeric($matches[2])) ? $matches[2] : null;
            }
            
            // Extract network (if available, often in 3rd or 4th column)
            $network = ($cells->length > 2) ? trim($cells->item(2)->textContent) : '';
            
            // Sometimes the notes or network is in the 4th column
            if ($cells->length > 3) {
                $notes = trim($cells->item(3)->textContent);
                if (empty($network) || preg_match('/^[a-zA-Z0-9\s]+$/', $notes)) {
                    $network = $notes;
                }
            }
            
            // Clean up network text
            $network = preg_replace('/\[\d+\]/', '', $network);
            
            // Determine status based on end year
            $status = ($endYear === null || $endYear === 'present') ? 'Ongoing' : 'Ended';
            
            // Save to database
            $sql = "INSERT IGNORE INTO tv_shows (title, start_year, end_year, network, status) 
                    VALUES (?, ?, ?, ?, ?)";
            
            try {
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("siiss", $title, $startYear, $endYear, $network, $status);
                
                if ($stmt->execute()) {
                    if ($stmt->affected_rows > 0) {
                        $showCount++;
                        $logger->info("Added: $title ($startYear-" . ($endYear ?: 'present') . ")");
                    } else {
                        $logger->info("Skipped duplicate: $title");
                    }
                } else {
                    $logger->error("Error adding '$title': " . $stmt->error);
                }
                
                $stmt->close();
            } catch (Exception $e) {
                $logger->error("Database error with '$title': " . $e->getMessage());
            }
        }
    }
    
    $logger->success("Added $showCount new shows from $url");
    return $showCount;
}

// Wikipedia lists by decade
$wikiLists = [
    'https://en.wikipedia.org/wiki/List_of_American_television_programs_by_debut_date_(2020s)',
    'https://en.wikipedia.org/wiki/List_of_American_television_programs_by_debut_date_(2010s)'
    // Add more as needed
];

$totalShows = 0;

// Process each list
foreach ($wikiLists as $url) {
    $count = scrapeWikipediaList($url, $conn, $logger);
    $totalShows += $count;
    
    $logger->success("Completed scraping $url - Added $count shows");
    
    // Be polite to Wikipedia's servers
    sleep(2);
}


function debugHTML($html, $logger) {
    $sample = substr($html, 0, 500) . "..."; // Get first 500 chars
    $logger->info("HTML Sample: " . $sample);
    
    // Check if it looks like Wikipedia content
    if (strpos($html, 'wikipedia') === false) {
        $logger->error("Response doesn't appear to be from Wikipedia");
    }
    
    // Check for common error messages
    if (strpos($html, 'error') !== false || strpos($html, 'denied') !== false) {
        $logger->error("Possible error in response: " . $sample);
    }
}

// Then call this after curl_exec:
debugHTML($html, $logger);


$logger->success("Scraping complete! Added a total of $totalShows TV shows to the database.");

$conn->close();
$logger->info("=== Scraper finished ===");
?>