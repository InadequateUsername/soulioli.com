<?php
// Initialize the session
session_start();

// Check if the user is logged in
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    // User is logged in, return user info
    echo json_encode([
        "loggedin" => true,
        "username" => $_SESSION["username"],
        "id" => $_SESSION["id"]
    ]);
} else {
    // User is not logged in
    echo json_encode([
        "loggedin" => false
    ]);
}
?>