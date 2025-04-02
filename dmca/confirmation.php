<?php
// Initialize the session (if not already started)
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/images/soul_society_logo.png" type="image/x-icon">
  <title>DMCA Request Confirmation - Soulioli</title>
  <link rel="stylesheet" href="/freemedia/style.css">
  <style>
    .confirmation-box {
      background-color: #1e1e1e;
      border-radius: 5px;
      padding: 25px;
      margin: 40px 0;
      text-align: center;
    }
    
    .success-message {
      color: #4CAF50;
      font-size: 1.2em;
      margin-bottom: 20px;
    }
    
    .error-message {
      color: #f44336;
      font-size: 1.2em;
      margin-bottom: 20px;
    }
    
    .action-btn {
      display: inline-block;
      background-color: #bb86fc;
      color: #121212;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 20px;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    
    .action-btn:hover {
      background-color: #9d4edd;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="nav-container">
      <a href="/" class="home-link">← Home</a>
      <div id="user-status"></div>
      <a href="/freemedia/" class="other-link">Free Media</a>
    </div>

    <header>
      <h1>DMCA Request Confirmation</h1>
    </header>

    <div class="confirmation-box">
      <?php if(isset($_SESSION['dmca_success'])): ?>
        <div class="success-message">
          <p><?php echo $_SESSION['dmca_success']; ?></p>
        </div>
        <p>Thank you for submitting your DMCA takedown request. We take all copyright claims seriously and will investigate your request promptly.</p>
        <p>A confirmation email has been sent to the address you provided.</p>
        <p>Our team will review your submission and take appropriate action in accordance with our DMCA policy. If we need additional information, we will contact you at the email address you provided.</p>
        <?php
        // Clear the session variable after displaying it
        unset($_SESSION['dmca_success']);
        ?>
      <?php elseif(isset($_SESSION['dmca_error'])): ?>
        <div class="error-message">
          <p><?php echo $_SESSION['dmca_error']; ?></p>
        </div>
        <p>Please return to the DMCA form and correct the issues before resubmitting.</p>
        <a href="index.html" class="action-btn">Return to DMCA Form</a>
        <?php
        // Clear the session variable after displaying it
        unset($_SESSION['dmca_error']);
        ?>
      <?php else: ?>
        <p>No DMCA request information was found. Please submit a request using our DMCA form.</p>
        <a href="index.html" class="action-btn">Go to DMCA Form</a>
      <?php endif; ?>
      
      <div style="margin-top: 30px;">
        <a href="/" class="action-btn">Return to Homepage</a>
      </div>
    </div>

    <p class="disclaimer">
      Disclaimer: This DMCA Takedown Request confirmation page is provided for informational purposes and to facilitate copyright-related communications. It does not constitute legal advice.
      © 2025 Soulioli. All rights reserved.
    </p>
  </div>

  <script src="/freemedia/script.js"></script>
</body>
</html>