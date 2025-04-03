<?php
// scripts/database.php
// Standardized database connection

// Include session management if needed
require_once __DIR__ . '/session.php';

/**
 * Get database connection
 * @return mysqli Database connection object
 */
function get_db_connection() {
    static $conn = null; // Static variable to store connection (only connect once)
    
    // If already connected, return existing connection
    if ($conn !== null) {
        return $conn;
    }
    
    try {
        // Set the path to the database configuration file
        $db_config_path = $_SERVER['DOCUMENT_ROOT'] . '/private/db_config.php';
        
        // If using a subdirectory for your site, you might need to adjust this path
        if (!file_exists($db_config_path)) {
            // Try a relative path as fallback
            $db_config_path = dirname(__DIR__) . '/private/db_config.php';
        }
        
        if (!file_exists($db_config_path)) {
            throw new Exception("Database configuration file not found");
        }
        
        $db_config = require_once $db_config_path;
        
        // Connect to database
        $conn = mysqli_connect(
            $db_config['db_server'],
            $db_config['db_username'],
            $db_config['db_password'],
            $db_config['db_name']
        );
        
        // Check connection
        if (!$conn) {
            throw new Exception("Database connection failed: " . mysqli_connect_error());
        }
        
        // Set character set to utf8mb4
        mysqli_set_charset($conn, "utf8mb4");
        
        return $conn;
    } 
    catch (Exception $e) {
        // Log error
        error_log("Database connection error: " . $e->getMessage());
        
        // Display friendly error in production, or detailed error in development
        $is_dev = isset($_SERVER['SERVER_NAME']) && ($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1');
        
        if ($is_dev) {
            echo "Database Error: " . $e->getMessage();
        } else {
            echo "Database connection error. Please try again later.";
        }
        
        exit;
    }
}

/**
 * Execute a prepared query with parameters
 * @param string $sql SQL query with placeholders
 * @param string $types Types of parameters (i=integer, d=double, s=string, b=blob)
 * @param array $params Array of parameters to bind
 * @return mysqli_stmt|false Prepared statement or false on failure
 */
function db_query($sql, $types = "", $params = []) {
    $conn = get_db_connection();
    $stmt = mysqli_prepare($conn, $sql);
    
    if ($stmt === false) {
        error_log("Error preparing query: " . mysqli_error($conn));
        return false;
    }
    
    // Bind parameters if any
    if ($types !== "" && !empty($params)) {
        // Create array with $types as first element followed by references to each parameter
        $bindParams = array($types);
        
        // Add references to each parameter
        foreach ($params as $key => $value) {
            $bindParams[] = &$params[$key];
        }
        
        // Call bind_param with dynamic parameters
        call_user_func_array(array($stmt, 'bind_param'), $bindParams);
    }
    
    // Execute the statement
    if (!mysqli_stmt_execute($stmt)) {
        error_log("Error executing query: " . mysqli_stmt_error($stmt));
        mysqli_stmt_close($stmt);
        return false;
    }
    
    return $stmt;
}
?>