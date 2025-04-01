<?php
// toggle_like.php - Handle post likes

session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'You must be logged in to like posts.']);
    exit;
}

// Get user ID
$user_id = $_SESSION['user_id'];

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate post_id
if (!isset($data['post_id']) || !is_numeric($data['post_id'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid post ID.']);
    exit;
}

$post_id = $data['post_id'];

// Connect to database
require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/db_connect.php';

// Check if post exists
$check_post = $conn->prepare("SELECT id FROM social_posts WHERE id = ?");
$check_post->bind_param("i", $post_id);
$check_post->execute();
$post_result = $check_post->get_result();

if ($post_result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Post not found.']);
    $check_post->close();
    $conn->close();
    exit;
}

// Check if already liked
$check_like = $conn->prepare("SELECT id FROM likes WHERE post_id = ? AND user_id = ?");
$check_like->bind_param("ii", $post_id, $user_id);
$check_like->execute();
$like_result = $check_like->get_result();

if ($like_result->num_rows > 0) {
    // Already liked, so remove the like
    $delete_like = $conn->prepare("DELETE FROM likes WHERE post_id = ? AND user_id = ?");
    $delete_like->bind_param("ii", $post_id, $user_id);
    
    if ($delete_like->execute()) {
        echo json_encode(['success' => true, 'action' => 'unliked']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to unlike post.']);
    }
    
    $delete_like->close();
} else {
    // Not liked yet, so add the like
    $add_like = $conn->prepare("INSERT INTO likes (post_id, user_id, created_at) VALUES (?, ?, NOW())");
    $add_like->bind_param("ii", $post_id, $user_id);
    
    if ($add_like->execute()) {
        echo json_encode(['success' => true, 'action' => 'liked']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to like post.']);
    }
    
    $add_like->close();
}

// Close connections
$check_like->close();
$check_post->close();
$conn->close();
?>