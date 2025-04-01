<?php
// get_posts.php - Retrieve social posts

session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';

// Check if a category filter is applied
$category_filter = isset($_GET['category']) ? $_GET['category'] : '';
$where_clause = $category_filter ? "WHERE p.category = ?" : "";

// Get current user ID if logged in
$current_user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

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

// Prepare and execute statement
$stmt = $conn->prepare($query);

try {
    // Bind parameters
    if ($current_user_id && $category_filter) {
        $stmt->bind_param("is", $current_user_id, $category_filter);
    } elseif ($current_user_id) {
        $stmt->bind_param("i", $current_user_id);
    } elseif ($category_filter) {
        $stmt->bind_param("s", $category_filter);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch all posts
    $posts = [];
    while ($row = $result->fetch_assoc()) {
        // Convert is_liked to boolean
        if (isset($row['is_liked'])) {
            $row['is_liked'] = $row['is_liked'] > 0;
        }
        $posts[] = $row;
    }

    // Close statement
    $stmt->close();

    // Output JSON
    header('Content-Type: application/json');
    echo json_encode($posts);
} catch (Exception $e) {
    // Error handling
    header('Content-Type: application/json');
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode([
        'error' => true, 
        'message' => 'Error retrieving posts: ' . $e->getMessage()
    ]);
} finally {
    // Close connection
    $conn->close();
}
?>