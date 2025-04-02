<?php
// Initialize the session
session_start();

// Debug information
error_log("check_login.php - Session data: " . print_r($_SESSION, true));

// Ensure consistent JSON response
header('Content-Type: application/json');

// Check if the user is logged in
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    // User is logged in, return user info
    $response = [
        "loggedin" => true,
        "username" => $_SESSION["username"] ?? "User",
        "user_id" => $_SESSION["user_id"] ?? null
    ];
    error_log("check_login.php - User is logged in: " . ($_SESSION["username"] ?? "Unknown"));
} else {
    // User is not logged in
    $response = [
        "loggedin" => false,
        "username" => null,
        "user_id" => null
    ];
    error_log("check_login.php - User is NOT logged in");
}

// Return the JSON response
echo json_encode($response);
exit;
?>