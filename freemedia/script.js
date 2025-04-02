// Function to check login status
function checkLoginStatus() {
  fetch('/check_login.php')
    .then(response => response.json())
    .then(data => {
      const userStatusElement = document.getElementById('user-status');
      
      if (data.loggedin) {
        // User is logged in - display username and logout link
        userStatusElement.innerHTML = `
          <span>Logged in as: ${data.username}</span>
          <a href="/logout.php">Logout</a>
        `;
      } else {
        // User is not logged in - display login link
        userStatusElement.innerHTML = `
          <a href="/login.php">Login / Register</a>
        `;
      }
    })
    .catch(error => {
      console.error('Error checking login status:', error);
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);