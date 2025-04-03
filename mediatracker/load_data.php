<?php
// Add error handling to prevent PHP notices/warnings from breaking JSON
error_reporting(E_ERROR);
ini_set('display_errors', 0);

// Check if the user is logged in
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    // Return proper JSON response for not logged in
    header('Content-Type: application/json');
    echo json_encode(array("success" => false, "message" => "User not logged in"));
    exit;
}

// Get user data
$user_id = $_SESSION["user_id"];
$username = $_SESSION["username"];

// Make sure we're outputting JSON
header('Content-Type: application/json');

try {
    // Include config file - use absolute path to be safe
    require_once $_SERVER['DOCUMENT_ROOT'] . "/config.php";

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
                }
            } else {
                // Return empty data structure with success true
                echo json_encode(array(
                    "success" => true,
                    "username" => $username,
                    "tv" => new stdClass(),
                    "movies" => new stdClass(),
                    "anime" => new stdClass(),
                    "cartoons" => new stdClass()
                ));
            }
        } else {
            throw new Exception("Error executing statement");
        }
        
        mysqli_stmt_close($stmt);
    } else {
        throw new Exception("Error preparing statement");
    }
    
    mysqli_close($conn);
} catch (Exception $e) {
    // Return error as JSON
    echo json_encode(array("success" => false, "message" => "Error: " . $e->getMessage()));
}
?>