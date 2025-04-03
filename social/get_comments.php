<?php
// get_comments.php - Retrieve comments for a post

session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/db_connect.php';

// Validate post_id
if (!isset($_GET['post_id']) || !is_numeric($_GET['post_id'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid post ID.']);
    exit;
}

$post_id = $_GET['post_id'];

// Prepare query to get comments
$query = "SELECT c.* FROM comments c 
          WHERE c.post_id = ? 
          ORDER BY c.created_at ASC";

// Prepare and execute statement
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $post_id);
$stmt->execute();
$result = $stmt->get_result();

// Fetch all comments
$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

// Close connection
$stmt->close();
$conn->close();

// Output JSON
header('Content-Type: application/json');
echo json_encode($comments);
?>