<?php
// includes/session.php
// Standardized session management

// If session isn't already started
if (session_status() == PHP_SESSION_NONE) {
    // Security settings for session cookies
    ini_set('session.cookie_httponly', 1);  // Helps prevent XSS
    ini_set('session.use_only_cookies', 1); // Don't accept session IDs via URLs
    ini_set('session.cookie_secure', 0);    // Set to 1 if using HTTPS
    
    // Start the session
    session_start();
}

/**
 * Check if user is logged in
 * @return boolean True if logged in, false otherwise
 */
function is_logged_in() {
    return isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true;
}

/**
 * Require login to access the current page
 * @param string $redirect_url URL to redirect to if not logged in
 */
function require_login($redirect_url = '/login.php') {
    if (!is_logged_in()) {
        header("Location: " . $redirect_url);
        exit;
    }
}

/**
 * Get current user ID
 * @return int|null User ID if logged in, null otherwise
 */
function get_user_id() {
    return is_logged_in() ? $_SESSION["user_id"] : null;
}

/**
 * Get username
 * @return string|null Username if logged in, null otherwise
 */
function get_username() {
    return is_logged_in() ? $_SESSION["username"] : null;
}
?>