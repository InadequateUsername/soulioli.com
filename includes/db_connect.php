<?php
// Database configuration
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'soulioli_test'); // Replace with your actual database username
define('DB_PASSWORD', '=70mD.VtK6=W'); // Replace with your actual database password
define('DB_NAME', 'soulioli_tracker_db'); // Replace with your actual database name

// Attempt to connect to MySQL database
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>