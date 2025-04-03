<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // Set the path to the database configuration file
    $db_config_path = $_SERVER['DOCUMENT_ROOT'] . '/private/db_config.php';
    
    // If using a subdirectory for your site, you might need to adjust this path
    if (!file_exists($db_config_path)) {
        // Try a relative path as fallback
        $db_config_path = dirname(__FILE__) . '/../private/db_config.php';
    }
    
    if (!file_exists($db_config_path)) {
        throw new Exception("Database configuration file not found at: $db_config_path");
    }
    
    $db_config = require_once $db_config_path;
    
    // Define constants for backward compatibility
    define('DB_SERVER', $db_config['db_server']);
    define('DB_USERNAME', $db_config['db_username']);
    define('DB_PASSWORD', $db_config['db_password']);
    define('DB_NAME', $db_config['db_name']);
    
    // Attempt to connect to MySQL database
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    
    // Check connection
    if ($conn === false) {
        throw new Exception("Database connection failed: " . mysqli_connect_error());
    }
} 
catch (Exception $e) {
    // Display error if in development environment
    echo "Configuration Error: " . $e->getMessage();
    exit;
}
?>