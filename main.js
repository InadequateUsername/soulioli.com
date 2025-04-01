// Function to check login status
function checkLoginStatus() {
    console.log("Starting checkLoginStatus function...");
    
    fetch('/check_login.php')
        .then(response => {
            console.log("Received response:", response);
            return response.json();
        })
        .then(data => {
            console.log("Parsed data:", data);
            
            const userStatusElement = document.getElementById('user-status');
            console.log("User status element:", userStatusElement);
            
            if (data.loggedin) {
                console.log("User is logged in as:", data.username);
                
                // User is logged in - replace the login link with username and logout link
                userStatusElement.innerHTML = `
                    <span style="margin-right: 10px; color: #bb86fc;">Logged in as: ${data.username}</span>
                    <a href="/logout.php" id="top-logout-link">Logout</a>
                `;
                
                // Add the same style as the login link to the logout link
                const logoutLink = document.getElementById('top-logout-link');
                console.log("Logout link element:", logoutLink);
                
                if (logoutLink) {
                    logoutLink.style.color = "#bb86fc";
                    logoutLink.style.textDecoration = "none";
                    logoutLink.style.backgroundColor = "transparent";
                    logoutLink.style.padding = "5px 10px";
                    logoutLink.style.borderRadius = "5px";
                    logoutLink.style.border = "1px solid #bb86fc";
                    console.log("Applied styling to logout link");
                }
            } else {
                console.log("User is not logged in");
            }
        })
        .catch(error => {
            console.error("Error checking login status:", error);
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);