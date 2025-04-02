<?php
// Enhanced debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Include config file (this starts the session)
require_once "config.php";

// Create a custom error log for login attempts
$log_file = 'login_debug.log';
file_put_contents($log_file, date('[Y-m-d H:i:s] ') . "Login page accessed\n", FILE_APPEND);

// Function to log debugging info
function debug_log($message) {
    global $log_file;
    file_put_contents($log_file, date('[Y-m-d H:i:s] ') . $message . "\n", FILE_APPEND);
}

// Log session information
debug_log("SESSION at start: " . print_r($_SESSION, true));

// Check if the user is already logged in, if yes then redirect to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    debug_log("User already logged in - redirecting to mediatracker");
    header("location: mediatracker/");
    exit;
}
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = $login_err = "";

// Log DB connection status
debug_log("Database connection: " . ($conn ? "SUCCESS" : "FAILED - " . mysqli_connect_error()));
 
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = $login_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    debug_log("Form submitted via POST");
    debug_log("POST data: " . print_r($_POST, true));
    debug_log("Username entered: " . (empty($_POST["username"]) ? "EMPTY" : $_POST["username"]));
    debug_log("Password entered: " . (empty($_POST["password"]) ? "EMPTY" : "NOT EMPTY"));
 
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
        debug_log("Error: Empty username");
    } else{
        $username = trim($_POST["username"]);
        debug_log("Username validated: $username");
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
        debug_log("Error: Empty password");
    } else{
        $password = trim($_POST["password"]);
        debug_log("Password provided (not logged for security)");
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        debug_log("Username and password provided, proceeding with validation");
        
        // Prepare a select statement
        $sql = "SELECT id, username, password FROM users WHERE username = ?";
        debug_log("SQL query: $sql");
        
        if($stmt = mysqli_prepare($conn, $sql)){
            debug_log("SQL statement prepared successfully");
            
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = $username;
            debug_log("Parameter bound: username = $username");
            
            // Attempt to execute the prepared statement
            debug_log("Executing SQL statement");
            if(mysqli_stmt_execute($stmt)){
                debug_log("SQL statement executed successfully");
                
                // Store result
                mysqli_stmt_store_result($stmt);
                $row_count = mysqli_stmt_num_rows($stmt);
                debug_log("Number of matching rows: $row_count");
                
                // Check if username exists, if yes then verify password
                if($row_count == 1){
                    debug_log("Username found in database");
                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                    debug_log("Result variables bound");
                    
                    if(mysqli_stmt_fetch($stmt)){
                        debug_log("Data fetched from statement");
                        debug_log("User ID: $id, Username: $username");
                        debug_log("Stored hashed password length: " . strlen($hashed_password));
                        
                        debug_log("Attempting password verification");
                        $password_verified = password_verify($password, $hashed_password);
                        debug_log("Password verification result: " . ($password_verified ? "SUCCESS" : "FAILED"));
                        
                        if($password_verified){
                            debug_log("Password verified successfully");
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["username"] = $username;                            
                            $_SESSION["user_id"] = $id;

                            debug_log("Session variables set: " . print_r($_SESSION, true));
                            debug_log("About to redirect to home page");
                            
                            // Redirect user to welcome page
                            header("location: /");
                            exit; // Add this to ensure code stops executing after redirect
                        } else{
                            // Password is not valid, display a generic error message
                            $login_err = "Invalid username or password.";
                            debug_log("Login failed: Password verification failed");
                        }
                    } else {
                        debug_log("Error: Could not fetch statement data");
                    }
                } else{
                    // Username doesn't exist, display a generic error message
                    $login_err = "Invalid username or password.";
                    debug_log("Login failed: Username not found");
                }
            } else{
                debug_log("Error executing SQL statement: " . mysqli_error($conn));
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
            debug_log("mysqli statement closed");
        } else {
            debug_log("Error preparing SQL statement: " . mysqli_error($conn));
        }
    } else {
        debug_log("Validation failed - see errors above");
    }
    
    // Close connection
    mysqli_close($conn);
    debug_log("Database connection closed");
}

debug_log("Rendering login form");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <div class="container">
        <h2>Login</h2>
        <p>Please fill in your credentials to login.</p>

        <?php 
        if(!empty($login_err)){
            echo '<div class="alert alert-danger">' . $login_err . '</div>';
            debug_log("Displayed error: $login_err");
        }        
        ?>

        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" class="form-control <?php echo (!empty($username_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $username; ?>">
                <span class="invalid-feedback"><?php echo $username_err; ?></span>
            </div>    
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" class="form-control <?php echo (!empty($password_err)) ? 'is-invalid' : ''; ?>">
                <span class="invalid-feedback"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn" value="Login">
            </div>
            <p>Don't have an account? <a href="register.php">Sign up now</a>.</p>
        </form>
    </div>
    <?php debug_log("Login page fully rendered"); ?>
</body>
</html>