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

// Database configuration
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'soulioli_test');
define('DB_PASSWORD', '=70mD.VtK6=W');
define('DB_NAME', 'soulioli_tracker_db');

// Attempt to connect to MySQL database
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>