<?php
// Initialize the session
session_start();

// Debug information
error_log("check_login.php - Session data: " . print_r($_SESSION, true));

// Check if the user is logged in
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    // User is logged in, return user info
    $response = [
        "loggedin" => true,
        "username" => $_SESSION["username"],
        "user_id" => $_SESSION["user_id"]
    ];
    error_log("check_login.php - User is logged in: " . $_SESSION["username"]);
} else {
    // User is not logged in
    $response = [
        "loggedin" => false
    ];
    error_log("check_login.php - User is NOT logged in");
}

// Set the content type to JSON
header('Content-Type: application/json');

// Return the JSON response
echo json_encode($response);
?>