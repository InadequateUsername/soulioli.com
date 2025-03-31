<?php
// Initialize the session
session_start();

// Check if the user is logged in
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    echo json_encode(array("success" => false, "message" => "User not logged in"));
    exit;
}

// Include config file
require_once "../config.php";

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if(!$data) {
    echo json_encode(array("success" => false, "message" => "No data received"));
    exit;
}

$user_id = $_SESSION["id"];

// Remove username from data before saving (if it exists)
if(isset($data["username"])) {
    unset($data["username"]);
}

// Check for 'success' field and remove it if exists
if(isset($data["success"])) {
    unset($data["success"]);
}

$data_json = json_encode($data);

// Check if user already has data
$sql = "SELECT id FROM user_data WHERE user_id = ?";
if($stmt = mysqli_prepare($conn, $sql)){
    mysqli_stmt_bind_param($stmt, "i", $user_id);
    
    if(mysqli_stmt_execute($stmt)){
        mysqli_stmt_store_result($stmt);
        
        if(mysqli_stmt_num_rows($stmt) > 0){
            // Update existing data
            $update_sql = "UPDATE user_data SET data_json = ? WHERE user_id = ?";
            if($update_stmt = mysqli_prepare($conn, $update_sql)){
                mysqli_stmt_bind_param($update_stmt, "si", $data_json, $user_id);
                
                if(mysqli_stmt_execute($update_stmt)){
                    echo json_encode(array("success" => true, "message" => "Data updated successfully"));
                } else{
                    echo json_encode(array("success" => false, "message" => "Error updating data: " . mysqli_error($conn)));
                }
                
                mysqli_stmt_close($update_stmt);
            }
        } else{
            // Insert new data
            $insert_sql = "INSERT INTO user_data (user_id, data_json) VALUES (?, ?)";
            if($insert_stmt = mysqli_prepare($conn, $insert_sql)){
                mysqli_stmt_bind_param($insert_stmt, "is", $user_id, $data_json);
                
                if(mysqli_stmt_execute($insert_stmt)){
                    echo json_encode(array("success" => true, "message" => "Data saved successfully"));
                } else{
                    echo json_encode(array("success" => false, "message" => "Error saving data: " . mysqli_error($conn)));
                }
                
                mysqli_stmt_close($insert_stmt);
            }
        }
    } else{
        echo json_encode(array("success" => false, "message" => "Error checking for existing data: " . mysqli_error($conn)));
    }
    
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(array("success" => false, "message" => "Error preparing statement: " . mysqli_error($conn)));
}

mysqli_close($conn);
?>