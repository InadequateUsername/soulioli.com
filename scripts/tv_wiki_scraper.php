<?php
// tv_wiki_enhanced_scraper.php
set_time_limit(600); // Increase time limit for script execution

// Database connection
require_once "../config.php";

// Function to extract data from a single Wikipedia page
function scrapeWikipediaShowPage($url, $conn) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'MediaTracker/1.0 (youremail@example.com)');
    
    $html = curl_exec($ch);
    
    if (curl_errno($ch)) {
        curl_close($ch);
        return null;
    }
    
    curl_close($ch);
    
    $dom = new DOMDocument();
    @$dom->loadHTML($html);
    $xpath = new DOMXPath($dom);
    
    // Get show title
    $title = $xpath->query("//h1[@id='firstHeading']")->item(0)->textContent;
    
    // Extract infobox data
    $infobox = $xpath->query("//table[contains(@class, 'infobox')]")->item(0);
    
    $data = [
        'title' => $title,
        'start_year' => null,
        'end_year' => null,
        'genre' => '',
        'creator' => '',
        'network' => '',
        'seasons' => null,
        'description' => '',
        'wiki_url' => $url
    ];
    
    if ($infobox) {
        $rows = $xpath->query(".//tr", $infobox);
        
        foreach ($rows as $row) {
            $header = $xpath->query(".//th", $row)->item(0);
            $value = $xpath->query(".//td", $row)->item(0);
            
            if ($header && $value) {
                $headerText = trim($header->textContent);
                $valueText = trim($value->textContent);
                
                // Extract different data based on header text
                switch ($headerText) {
                    case 'Genre':
                        $data['genre'] = $valueText;
                        break;
                    case 'Created by':
                    case 'Developer(s)':
                        $data['creator'] = $valueText;
                        break;
                    case 'Original network':
                        $data['network'] = $valueText;
                        break;
                    case 'Original release':
                        // Parse date range
                        $datePattern = '/(\d{4})(?:\s*[-–—]\s*(\d{4}|present))?/';
                        if (preg_match($datePattern, $valueText, $matches)) {
                            $data['start_year'] = $matches[1];
                            $data['end_year'] = isset($matches[2]) && $matches[2] !== 'present' ? $matches[2] : null;
                        }
                        break;
                    case 'No. of seasons':
                        $data['seasons'] = (int) $valueText;
                        break;
                }
            }
        }
    }
    
    // Get description from first paragraph
    $paragraphs = $xpath->query("//div[@id='mw-content-text']//p");
    foreach ($paragraphs as $para) {
        $text = trim($para->textContent);
        if (strlen($text) > 50) {  // Skip short paragraphs
            $data['description'] = $text;
            break;
        }
    }
    
    return $data;
}

// Function to clean text
function cleanText($text) {
    $text = preg_replace('/\[\d+\]/', '', $text); // Remove reference numbers
    $text = preg_replace('/\s+/', ' ', $text);    // Normalize whitespace
    return trim($text);
}

// Create tables if they don't exist
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
$conn->query($createTableSQL);

// Get show links from the main list pages
function getShowLinksFromList($url, $conn) {
    echo "Getting links from: $url\n";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'MediaTracker/1.0 (youremail@example.com)');
    
    $html = curl_exec($ch);
    
    if (curl_errno($ch)) {
        echo "cURL Error: " . curl_error($ch) . "\n";
        curl_close($ch);
        return [];
    }
    
    curl_close($ch);
    
    $dom = new DOMDocument();
    @$dom->loadHTML($html);
    $xpath = new DOMXPath($dom);
    
    $links = [];
    $tables = $xpath->query("//table[contains(@class, 'wikitable')]");
    
    foreach ($tables as $table) {
        $rows = $xpath->query(".//tr", $table);
        $headerRow = true;
        
        foreach ($rows as $row) {
            if ($headerRow) {
                $headerRow = false;
                continue;
            }
            
            $cells = $xpath->query(".//td", $row);
            
            if ($cells->length < 1) {
                continue;
            }
            
            // Get title cell
            $titleCell = $cells->item(0);
            $linkNodes = $xpath->query(".//a", $titleCell);
            
            if ($linkNodes->length > 0) {
                $linkNode = $linkNodes->item(0);
                $href = $linkNode->getAttribute('href');
                
                // Make sure it's a Wikipedia article link
                if (strpos($href, '/wiki/') === 0 && strpos($href, ':') === false) {
                    $links[] = 'https://en.wikipedia.org' . $href;
                }
            }
        }
    }
    
    return $links;
}

// Process all lists
$wikiLists = [
    'https://en.wikipedia.org/wiki/List_of_American_television_programs_by_debut_date_(2020s)',
    'https://en.wikipedia.org/wiki/List_of_American_television_programs_by_debut_date_(2010s)',
    // Add more list URLs here
];

$allShowLinks = [];

foreach ($wikiLists as $listUrl) {
    $showLinks = getShowLinksFromList($listUrl, $conn);
    $allShowLinks = array_merge($allShowLinks, $showLinks);
    echo "Found " . count($showLinks) . " show links from $listUrl\n";
    sleep(1);
}

// Remove duplicates
$allShowLinks = array_unique($allShowLinks);
echo "Total unique show links: " . count($allShowLinks) . "\n";

// Process each show page
$processedCount = 0;
foreach ($allShowLinks as $showLink) {
    echo "Processing: $showLink\n";
    
    $showData = scrapeWikipediaShowPage($showLink, $conn);
    
    if ($showData) {
        // Clean data
        foreach ($showData as $key => $value) {
            if (is_string($value)) {
                $showData[$key] = cleanText($value);
            }
        }
        
        // Determine status
        $status = ($showData['end_year'] === null) ? 'Ongoing' : 'Ended';
        
        // Insert into database
        $sql = "INSERT INTO tv_shows 
                (title, start_year, end_year, creator, network, genre, num_seasons, status, description, wiki_url) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                creator = VALUES(creator),
                network = VALUES(network),
                genre = VALUES(genre),
                num_seasons = VALUES(num_seasons),
                status = VALUES(status),
                description = VALUES(description)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "siisssisss", 
            $showData['title'], 
            $showData['start_year'], 
            $showData['end_year'], 
            $showData['creator'], 
            $showData['network'], 
            $showData['genre'], 
            $showData['seasons'], 
            $status, 
            $showData['description'], 
            $showData['wiki_url']
        );
        
        if ($stmt->execute()) {
            $processedCount++;
            echo "Added/Updated: " . $showData['title'] . "\n";
        } else {
            echo "Error adding '" . $showData['title'] . "': " . $stmt->error . "\n";
        }
        
        $stmt->close();
    }
    
    // Be respectful to Wikipedia servers
    sleep(2);
    
    // Provide progress update
    if ($processedCount % 10 == 0) {
        echo "Processed $processedCount shows so far...\n";
    }
}

echo "Scraping complete! Processed a total of $processedCount TV shows.\n";

$conn->close();
?>