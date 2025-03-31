// Function to check login status
function checkLoginStatus() {
    fetch('check_login.php')
        .then(response => response.json())
        .then(data => {
            const userStatusElement = document.getElementById('user-status');
            const loginNavItem = document.getElementById('login-nav-item');
            const topLoginLink = document.getElementById('top-login-link');
            
            if (data.loggedin) {
                // User is logged in
                userStatusElement.innerHTML = `
                    <span>Logged in as: ${data.username}</span>
                    <a href="/logout.php">Logout</a>
                `;
                
                // Hide the login button in nav
                loginNavItem.style.display = 'none';
            } else {
                // User is not logged in
                // We already have the login link in user-status, so just hide the nav one
                loginNavItem.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);