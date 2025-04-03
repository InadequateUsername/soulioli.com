<?php
// add_comment.php - Add a comment to a post

// Include standardized session and database management
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/session.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/database.php';

// Set content type to JSON
header('Content-Type: application/json');

// Check if user is logged in
if (!is_logged_in()) {
    echo json_encode(['success' => false, 'message' => 'You must be logged in to comment.']);
    exit;
}

try {
    // Get user information using helper functions
    $user_id = get_user_id();
    $username = get_username();
    
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!isset($data['post_id']) || !isset($data['comment']) || empty(trim($data['comment']))) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
        exit;
    }
    
    $post_id = $data['post_id'];
    $comment = trim($data['comment']);
    
    // Get database connection
    $conn = get_db_connection();
    
    // Check if post exists
    $check_sql = "SELECT id FROM social_posts WHERE id = ?";
    $check_stmt = db_query($check_sql, "i", [$post_id]);
    
    if ($check_stmt === false) {
        throw new Exception("Error checking post existence");
    }
    
    $post_result = mysqli_stmt_get_result($check_stmt);
    
    if (mysqli_num_rows($post_result) === 0) {
        echo json_encode(['success' => false, 'message' => 'Post not found.']);
        mysqli_stmt_close($check_stmt);
        exit;
    }
    
    mysqli_stmt_close($check_stmt);
    
    // Add the comment
    $add_sql = "INSERT INTO comments (post_id, user_id, username, comment, created_at) 
               VALUES (?, ?, ?, ?, NOW())";
    $add_stmt = db_query($add_sql, "iiss", [$post_id, $user_id, $username, $comment]);
    
    if ($add_stmt === false) {
        throw new Exception("Error adding comment");
    }
    
    // Check if insertion was successful
    if (mysqli_stmt_affected_rows($add_stmt) > 0) {
        echo json_encode(['success' => true]);
    } else {
        throw new Exception("Failed to add comment");
    }
    
    // Close statement
    mysqli_stmt_close($add_stmt);
} 
catch (Exception $e) {
    // Log error
    error_log("Error in add_comment.php: " . $e->getMessage());
    
    // Send error response
    echo json_encode(['success' => false, 'message' => 'Failed to add comment: ' . $e->getMessage()]);
}
?>