<?php
// Only start the session if one hasn't been started yet
if (session_status() == PHP_SESSION_NONE) {
    // Set session cookie parameters BEFORE starting the session
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    ini_set('session.cookie_secure', 0); // Set to 1 if you use HTTPS
    
    // Start the session after setting parameters
    session_start();
}

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // Try to load the database configuration file from a secure location
    $db_config_path = $_SERVER['DOCUMENT_ROOT'] . '/db_config.php';
    
    if (!file_exists($db_config_path)) {
        throw new Exception("Database configuration file not found.");
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