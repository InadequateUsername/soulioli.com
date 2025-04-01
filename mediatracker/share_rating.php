<?php
// share_rating.php - Handle sharing ratings
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'You must be logged in to share ratings.']);
    exit;
}

// Get user ID and username
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['category']) || !isset($data['title']) || !isset($data['thoughts'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit;
}

// Connect to database
require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';

// Prepare statement
$stmt = $conn->prepare("INSERT INTO social_posts (user_id, username, category, title, rating, thoughts, created_at) 
                        VALUES (?, ?, ?, ?, ?, ?, NOW())");

// Bind parameters
// Add a check to handle cases where rating might not be set
$rating = isset($data['rating']) ? $data['rating'] : null;
$stmt->bind_param("isssss", $user_id, $username, $data['category'], $data['title'], $rating, $data['thoughts']);

// Execute statement
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}

// Close connection
$stmt->close();
$conn->close();
?>