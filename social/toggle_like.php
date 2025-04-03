<?php
// toggle_like.php - Handle post likes

// Include standardized session and database management
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/session.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/database.php';

// Set content type to JSON
header('Content-Type: application/json');

// Check if user is logged in
if (!is_logged_in()) {
    echo json_encode(['success' => false, 'message' => 'You must be logged in to like posts.']);
    exit;
}

try {
    // Get user ID
    $user_id = get_user_id();
    
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate post_id
    if (!isset($data['post_id']) || !is_numeric($data['post_id'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid post ID.']);
        exit;
    }
    
    $post_id = $data['post_id'];
    
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
    
    // Check if already liked
    $like_sql = "SELECT id FROM likes WHERE post_id = ? AND user_id = ?";
    $like_stmt = db_query($like_sql, "ii", [$post_id, $user_id]);
    
    if ($like_stmt === false) {
        throw new Exception("Error checking like status");
    }
    
    $like_result = mysqli_stmt_get_result($like_stmt);
    
    if (mysqli_num_rows($like_result) > 0) {
        // Already liked, so remove the like
        $delete_sql = "DELETE FROM likes WHERE post_id = ? AND user_id = ?";
        $delete_stmt = db_query($delete_sql, "ii", [$post_id, $user_id]);
        
        if ($delete_stmt === false || mysqli_stmt_affected_rows($delete_stmt) === 0) {
            throw new Exception("Failed to unlike post");
        }
        
        mysqli_stmt_close($delete_stmt);
        echo json_encode(['success' => true, 'action' => 'unliked']);
    } else {
        // Not liked yet, so add the like
        $add_sql = "INSERT INTO likes (post_id, user_id, created_at) VALUES (?, ?, NOW())";
        $add_stmt = db_query($add_sql, "ii", [$post_id, $user_id]);
        
        if ($add_stmt === false || mysqli_stmt_affected_rows($add_stmt) === 0) {
            throw new Exception("Failed to like post");
        }
        
        mysqli_stmt_close($add_stmt);
        echo json_encode(['success' => true, 'action' => 'liked']);
    }
    
    mysqli_stmt_close($like_stmt);
} 
catch (Exception $e) {
    // Log error
    error_log("Error in toggle_like.php: " . $e->getMessage());
    
    // Send error response
    echo json_encode(['success' => false, 'message' => 'Failed to process like action: ' . $e->getMessage()]);
}
?>