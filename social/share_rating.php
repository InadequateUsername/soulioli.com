<?php
// share_rating.php - Handle sharing ratings

// Include standardized session and database management
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/session.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/database.php';

// Set content type to JSON
header('Content-Type: application/json');

// Check if user is logged in
if (!is_logged_in()) {
    echo json_encode(['success' => false, 'message' => 'You must be logged in to share ratings.']);
    exit;
}

try {
    // Get user information
    $user_id = get_user_id();
    $username = get_username();
    
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!isset($data['category']) || !isset($data['title']) || !isset($data['thoughts'])) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
        exit;
    }
    
    // Get database connection
    $conn = get_db_connection();
    
    // Handle null rating properly
    $rating = isset($data['rating']) && $data['rating'] !== '' ? $data['rating'] : null;
    
    // Insert the rating
    $sql = "INSERT INTO social_posts (user_id, username, category, title, rating, thoughts, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())";
    
    $stmt = db_query($sql, "isssss", [$user_id, $username, $data['category'], $data['title'], $rating, $data['thoughts']]);
    
    if ($stmt === false || mysqli_stmt_affected_rows($stmt) === 0) {
        throw new Exception("Failed to add rating");
    }
    
    // Return success
    echo json_encode(['success' => true]);
    
    // Close statement
    mysqli_stmt_close($stmt);
} 
catch (Exception $e) {
    // Log error
    error_log("Error in share_rating.php: " . $e->getMessage());
    
    // Return error as JSON
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>