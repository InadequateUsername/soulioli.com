<?php
// mediatracker/load_data.php - Load user media data

// Include standardized session and database management
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/session.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/database.php';

// Set content type to JSON
header('Content-Type: application/json');

// Add error handling to prevent PHP notices/warnings from breaking JSON
error_reporting(E_ERROR);
ini_set('display_errors', 0);

// Check if the user is logged in
if (!is_logged_in()) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit;
}

try {
    // Get user data
    $user_id = get_user_id();
    $username = get_username();
    
    // Get database connection
    $conn = get_db_connection();
    
    // Get user data
    $sql = "SELECT data_json FROM user_data WHERE user_id = ?";
    $stmt = db_query($sql, "i", [$user_id]);
    
    if ($stmt === false) {
        throw new Exception("Error retrieving user data");
    }
    
    $result = mysqli_stmt_get_result($stmt);
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $data_json = $row['data_json'];
        
        // Decode the JSON to add the username
        $data = json_decode($data_json, true);
        
        // Add username to the response data
        $data["username"] = $username;
        
        // Return the modified data
        echo json_encode($data);
    } else {
        // Return empty data structure with success true
        echo json_encode([
            "success" => true,
            "username" => $username,
            "tv" => new stdClass(),
            "movies" => new stdClass(),
            "anime" => new stdClass(),
            "cartoons" => new stdClass()
        ]);
    }
    
    // Close statement
    mysqli_stmt_close($stmt);
} 
catch (Exception $e) {
    // Log error
    error_log("Error in load_data.php: " . $e->getMessage());
    
    // Return error as JSON
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>