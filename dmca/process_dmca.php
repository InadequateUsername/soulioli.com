<?php
// Initialize the session (if not already started)
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Set the content type
header('Content-Type: text/html; charset=utf-8');

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate required fields
    $required_fields = [
        'name', 
        'email', 
        'copyright_work', 
        'infringing_material', 
        'good_faith', 
        'accuracy', 
        'digital_signature'
    ];
    
    $missing_fields = [];
    
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            $missing_fields[] = $field;
        }
    }
    
    // If missing fields, redirect back with error
    if (!empty($missing_fields)) {
        $_SESSION['dmca_error'] = "The following required fields are missing: " . implode(', ', $missing_fields);
        header("Location: index.html");
        exit;
    }
    
    // Sanitize input data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = !empty($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : 'Not provided';
    $copyright_work = htmlspecialchars(trim($_POST['copyright_work']));
    $infringing_material = htmlspecialchars(trim($_POST['infringing_material']));
    $good_faith = htmlspecialchars(trim($_POST['good_faith']));
    $accuracy = htmlspecialchars(trim($_POST['accuracy']));
    $digital_signature = htmlspecialchars(trim($_POST['digital_signature']));
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['dmca_error'] = "Invalid email format";
        header("Location: index.html");
        exit;
    }
    
    // Verify digital signature matches name
    if ($digital_signature !== $name) {
        $_SESSION['dmca_error'] = "Digital signature must match your full name";
        header("Location: index.html");
        exit;
    }
    
    // Prepare email content
    $to = "dmca@soulioli.com"; // Change to your actual DMCA notification email
    $subject = "DMCA Takedown Request";
    
    $message = "DMCA Takedown Request\n\n";
    $message .= "Name: " . $name . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Phone: " . $phone . "\n\n";
    $message .= "Copyrighted Work:\n" . $copyright_work . "\n\n";
    $message .= "Infringing Material:\n" . $infringing_material . "\n\n";
    $message .= "Good Faith Statement:\n" . $good_faith . "\n\n";
    $message .= "Accuracy Statement:\n" . $accuracy . "\n\n";
    $message .= "Digital Signature: " . $digital_signature . "\n";
    $message .= "Timestamp: " . date("Y-m-d H:i:s") . "\n";
    $message .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    
    // Send email - in production, you might want to use a more robust email solution
    $mail_sent = mail($to, $subject, $message, $headers);
    
    // Save to log file
    $log_file = "dmca_requests.log";
    $log_message = date("Y-m-d H:i:s") . " | " . $name . " | " . $email . " | " . $_SERVER['REMOTE_ADDR'] . "\n";
    file_put_contents($log_file, $log_message, FILE_APPEND);
    
    // Optionally, save to database here if you have one
    
    // Redirect to success page
    if ($mail_sent) {
        $_SESSION['dmca_success'] = "Your DMCA takedown request has been submitted successfully. We will review it and take appropriate action.";
    } else {
        $_SESSION['dmca_error'] = "There was a problem sending your request. Please try again or contact us directly at dmca@soulioli.com.";
    }
    
    // Redirect to confirmation page
    header("Location: confirmation.php");
    exit;
} else {
    // If not a POST request, redirect to the form
    header("Location: index.html");
    exit;
}
?>