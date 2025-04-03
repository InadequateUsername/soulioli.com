<?php
// get_comments.php - Retrieve comments for a post

// Include standardized session and database management
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/session.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/database.php';

// Validate post_id
if (!isset($_GET['post_id']) || !is_numeric($_GET['post_id'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Invalid post ID.']);
    exit;
}

$post_id = $_GET['post_id'];

try {
    // Get database connection
    $conn = get_db_connection();
    
    // Prepare query to get comments
    $query = "SELECT c.* FROM comments c 
              WHERE c.post_id = ? 
              ORDER BY c.created_at ASC";
    
    // Execute query using our helper function
    $stmt = db_query($query, "i", [$post_id]);
    
    if ($stmt === false) {
        throw new Exception("Error retrieving comments");
    }
    
    $result = mysqli_stmt_get_result($stmt);
    
    // Fetch all comments
    $comments = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $comments[] = $row;
    }
    
    // Close statement
    mysqli_stmt_close($stmt);
    
    // Output JSON
    header('Content-Type: application/json');
    echo json_encode($comments);
} 
catch (Exception $e) {
    // Log error
    error_log("Error in get_comments.php: " . $e->getMessage());
    
    // Send error response
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error retrieving comments.']);
}
?>