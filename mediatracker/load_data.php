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

$user_id = $_SESSION["id"];
$username = $_SESSION["username"];

// Get user data
$sql = "SELECT data_json FROM user_data WHERE user_id = ?";
if($stmt = mysqli_prepare($conn, $sql)){
    mysqli_stmt_bind_param($stmt, "i", $user_id);
    
    if(mysqli_stmt_execute($stmt)){
        mysqli_stmt_store_result($stmt);
        
        if(mysqli_stmt_num_rows($stmt) > 0){
            mysqli_stmt_bind_result($stmt, $data_json);
            
            if(mysqli_stmt_fetch($stmt)){
                // Decode the JSON to add the username
                $data = json_decode($data_json, true);
                
                // Add username to the response data
                $data["username"] = $username;
                
                // Return the modified data
                echo json_encode($data);
            } else {
                // Return empty data structure with success true
                echo json_encode(array(
                    "success" => true,
                    "username" => $username,
                    "tv" => new stdClass(),
                    "movies" => new stdClass(),
                    "anime" => new stdClass()
                ));
            }
        } else {
            // Return empty data structure with success true
            echo json_encode(array(
                "success" => true,
                "username" => $username,
                "tv" => new stdClass(),
                "movies" => new stdClass(),
                "anime" => new stdClass()
            ));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Error loading data"));
    }
    
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(array("success" => false, "message" => "Error preparing statement"));
}

mysqli_close($conn);
?>