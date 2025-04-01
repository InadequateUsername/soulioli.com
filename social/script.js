// Initialize variables
let isLoggedIn = false;
let currentUserId = null;
let currentUsername = null;
let currentFilter = 'all';
let posts = [];

// Check login status
function checkLoginStatus() {
  fetch('/check_login.php')
    .then(response => response.json())
    .then(data => {
      if (data.loggedin) {
        // User is logged in
        isLoggedIn = true;
        currentUserId = data.user_id;  // Use only user_id consistently
        currentUsername = data.username;
        // Rest of your code...
      }
    });
}

// Function to load posts
function loadPosts() {
  const feedContainer = document.getElementById('feed-container');
  
  // Show loading spinner
  feedContainer.innerHTML = '<div class="loader"></div>';
  
  fetch('get_posts.php' + (currentFilter !== 'all' ? `?category=${currentFilter}` : ''))
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      posts = data; // Save posts to variable
      
      // Remove loader
      feedContainer.innerHTML = '';
      
      if (!Array.isArray(data) || data.length === 0) {
        feedContainer.innerHTML = '<div class="no-posts">No posts found. Be the first to share!</div>';
        return;
      }
      
      // Display posts
      posts.forEach(post => {
        const postElement = createPostElement(post);
        feedContainer.appendChild(postElement);
      });
    })
    .catch(error => {
      console.error('Error loading posts:', error);
      feedContainer.innerHTML = '<div class="no-posts">Error loading posts. Please try again later.</div>';
    });
}

// Rest of the JavaScript functions...

// Load data when page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);