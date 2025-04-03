<?php
// add_comment.php - Add a comment to a post

session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'You must be logged in to comment.']);
    exit;
}

// Get user ID and username
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['post_id']) || !isset($data['comment']) || empty(trim($data['comment']))) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit;
}

$post_id = $data['post_id'];
$comment = trim($data['comment']);

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

// Add the comment
$add_comment = $conn->prepare("INSERT INTO comments (post_id, user_id, username, comment, created_at) 
                              VALUES (?, ?, ?, ?, NOW())");
$add_comment->bind_param("iiss", $post_id, $user_id, $username, $comment);

if ($add_comment->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to add comment: ' . $add_comment->error]);
}

// Close connections
$add_comment->close();
$check_post->close();
$conn->close();
?>