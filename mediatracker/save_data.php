<?php
// mediatracker/save_data.php - Save user media data

// Include standardized session and database management
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/session.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/database.php';

// Set content type to JSON
header('Content-Type: application/json');

// Check if the user is logged in
if (!is_logged_in()) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit;
}

try {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        echo json_encode(["success" => false, "message" => "No data received"]);
        exit;
    }
    
    // Get user ID
    $user_id = get_user_id();
    
    // Remove username from data before saving (if it exists)
    if (isset($data["username"])) {
        unset($data["username"]);
    }
    
    // Check for 'success' field and remove it if exists
    if (isset($data["success"])) {
        unset($data["success"]);
    }
    
    // Convert data to JSON
    $data_json = json_encode($data);
    
    // Get database connection
    $conn = get_db_connection();
    
    // Check if user already has data
    $check_sql = "SELECT id FROM user_data WHERE user_id = ?";
    $check_stmt = db_query($check_sql, "i", [$user_id]);
    
    if ($check_stmt === false) {
        throw new Exception("Error checking for existing data");
    }
    
    $result = mysqli_stmt_get_result($check_stmt);
    
    if (mysqli_num_rows($result) > 0) {
        // Update existing data
        $update_sql = "UPDATE user_data SET data_json = ? WHERE user_id = ?";
        $update_stmt = db_query($update_sql, "si", [$data_json, $user_id]);
        
        if ($update_stmt === false || mysqli_stmt_affected_rows($update_stmt) === 0) {
            throw new Exception("Error updating data");
        }
        
        mysqli_stmt_close($update_stmt);
        echo json_encode(["success" => true, "message" => "Data updated successfully"]);
    } else {
        // Insert new data
        $insert_sql = "INSERT INTO user_data (user_id, data_json) VALUES (?, ?)";
        $insert_stmt = db_query($insert_sql, "is", [$user_id, $data_json]);
        
        if ($insert_stmt === false || mysqli_stmt_affected_rows($insert_stmt) === 0) {
            throw new Exception("Error saving data");
        }
        
        mysqli_stmt_close($insert_stmt);
        echo json_encode(["success" => true, "message" => "Data saved successfully"]);
    }
    
    // Close check statement
    mysqli_stmt_close($check_stmt);
} 
catch (Exception $e) {
    // Log error
    error_log("Error in save_data.php: " . $e->getMessage());
    
    // Return error as JSON
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>