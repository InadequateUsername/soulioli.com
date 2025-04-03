<?php
// get_posts.php - Retrieve social posts

// Include standardized session and database management
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/session.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/database.php';

// Set content type to JSON
header('Content-Type: application/json');

try {
    // Check if a category filter is applied
    $category_filter = isset($_GET['category']) ? $_GET['category'] : '';
    $where_clause = $category_filter ? "WHERE p.category = ?" : "";
    
    // Get current user ID if logged in
    $current_user_id = is_logged_in() ? get_user_id() : null;
    
    // Get database connection
    $conn = get_db_connection();
    
    // Prepare query to get posts with like and comment counts
    $query = "SELECT p.*, 
              (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as like_count,
              (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count";
    
    // Add is_liked field if user is logged in
    if ($current_user_id) {
        $query .= ", (SELECT COUNT(*) FROM likes WHERE post_id = p.id AND user_id = ?) as is_liked";
    }
    
    // Complete the query
    $query .= " FROM social_posts p $where_clause ORDER BY p.created_at DESC LIMIT 50";
    
    // Determine types and parameters based on filters and login status
    $types = "";
    $params = [];
    
    if ($current_user_id && $category_filter) {
        $types = "is";
        $params = [$current_user_id, $category_filter];
    } elseif ($current_user_id) {
        $types = "i";
        $params = [$current_user_id];
    } elseif ($category_filter) {
        $types = "s";
        $params = [$category_filter];
    }
    
    // Execute query
    $stmt = db_query($query, $types, $params);
    
    if ($stmt === false) {
        throw new Exception("Error retrieving posts");
    }
    
    $result = mysqli_stmt_get_result($stmt);
    
    // Fetch all posts
    $posts = [];
    while ($row = mysqli_fetch_assoc($result)) {
        // Convert is_liked to boolean
        if (isset($row['is_liked'])) {
            $row['is_liked'] = $row['is_liked'] > 0;
        }
        
        // Ensure rating is properly formatted for display
        $row['rating'] = $row['rating'] === null || $row['rating'] === '' ? null : $row['rating'];
        
        $posts[] = $row;
    }
    
    // Close statement
    mysqli_stmt_close($stmt);
    
    // Output JSON
    echo json_encode($posts);
} 
catch (Exception $e) {
    // Log error
    error_log("Error in get_posts.php: " . $e->getMessage());
    
    // Send error response
    echo json_encode([
        'error' => true, 
        'message' => 'Error retrieving posts: ' . $e->getMessage()
    ]);
}
?>