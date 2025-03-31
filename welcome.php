<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Welcome <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b></h2>
        <p>Your account has been created successfully.</p>
        <p>
            <a href="mediatracker/" class="btn">Go to ACS Tracker</a>
            <a href="logout.php" class="btn">Sign Out</a>
        </p>
    </div>
</body>
</html>