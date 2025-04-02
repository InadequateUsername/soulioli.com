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

// Function to create a post element
function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.className = 'post';
  postElement.dataset.id = post.id;
  
  // Format the time (e.g., "2 hours ago")
  const postTime = formatTimeAgo(new Date(post.created_at));
  
  // Format category text for display
  const categoryText = {
    'tv': 'TV Show',
    'movies': 'Movie',
    'anime': 'Anime',
    'cartoons': 'Cartoon'
  }[post.category] || post.category;
  
  // Properly handle the rating display
  let ratingDisplay = 'Not Rated';
  if (post.rating !== null && post.rating !== '') {
    ratingDisplay = post.rating + '/10';
  }
  
  // Create post HTML
  postElement.innerHTML = `
    <div class="post-header">
      <div class="post-user">${post.username}</div>
      <div class="post-time">${postTime}</div>
    </div>
    <div>
      <span class="post-category">${categoryText}</span>
    </div>
    <div class="post-title">${post.title}</div>
    <div>
      <span class="post-rating">${ratingDisplay}</span>
    </div>
    <div class="post-thoughts">${post.thoughts}</div>
    <div class="post-actions">
      <button class="action-btn like-btn" data-post-id="${post.id}">
        <span class="like-icon">♥</span> 
        <span class="like-count">${post.like_count || 0}</span> Likes
      </button>
      <button class="action-btn comment-btn" data-post-id="${post.id}">
        <span class="comment-icon">💬</span> 
        <span class="comment-count">${post.comment_count || 0}</span> Comments
      </button>
    </div>
    <div class="comments-section" id="comments-${post.id}">
      <div class="comments-container"></div>
      ${isLoggedIn ? `
        <div class="comment-form">
          <input type="text" class="comment-input" placeholder="Add a comment...">
          <button class="comment-submit" data-post-id="${post.id}">Comment</button>
        </div>
      ` : `
        <div style="text-align: center; margin-top: 10px;">
          <a href="/login.php" style="color: #bb86fc;">Login to comment</a>
        </div>
      `}
    </div>
  `;
  
  // Add event listeners
  const likeBtn = postElement.querySelector('.like-btn');
  const commentBtn = postElement.querySelector('.comment-btn');
  
  likeBtn.addEventListener('click', () => {
    if (isLoggedIn) {
      toggleLike(post.id, likeBtn);
    } else {
      alert('Please login to like posts.');
    }
  });
  
  commentBtn.addEventListener('click', () => {
    toggleComments(post.id);
  });
  
  // If logged in, add comment submission event listener
  if (isLoggedIn) {
    const commentSubmit = postElement.querySelector('.comment-submit');
    if (commentSubmit) {
      commentSubmit.addEventListener('click', () => {
        const commentInput = postElement.querySelector('.comment-input');
        submitComment(post.id, commentInput.value);
        commentInput.value = '';
      });
    }
  }
  
  // Check if post is already liked by current user
  if (isLoggedIn && post.is_liked) {
    likeBtn.classList.add('liked');
    likeBtn.querySelector('.like-icon').style.color = '#bb86fc';
  }
  
  return postElement;
}

// Modify the function to not duplicate login status check
function initializePage() {
  // Load posts after initial setup
  loadPosts();
}

// Function to toggle like
function toggleLike(postId, likeBtn) {
  fetch('toggle_like.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_id: postId })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const likeCount = likeBtn.querySelector('.like-count');
      const likeIcon = likeBtn.querySelector('.like-icon');
      
      if (data.action === 'liked') {
        likeBtn.classList.add('liked');
        likeIcon.style.color = '#bb86fc';
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
      } else {
        likeBtn.classList.remove('liked');
        likeIcon.style.color = '';
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
      }
    } else {
      alert('Error: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error processing your request. Please try again later.');
  });
}

// Function to toggle comments section
function toggleComments(postId) {
  const commentsSection = document.getElementById(`comments-${postId}`);
  
  if (commentsSection.style.display === 'block') {
    commentsSection.style.display = 'none';
  } else {
    commentsSection.style.display = 'block';
    loadComments(postId);
  }
}

// Function to load comments
function loadComments(postId) {
  const commentsContainer = document.querySelector(`#comments-${postId} .comments-container`);
  commentsContainer.innerHTML = '<div class="loader" style="width: 20px; height: 20px;"></div>';
  
  fetch(`get_comments.php?post_id=${postId}`)
    .then(response => response.json())
    .then(data => {
      commentsContainer.innerHTML = '';
      
      if (data.length === 0) {
        commentsContainer.innerHTML = '<div style="text-align: center; padding: 10px;">No comments yet. Be the first!</div>';
        return;
      }
      
      data.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        
        const commentTime = formatTimeAgo(new Date(comment.created_at));
        
        commentElement.innerHTML = `
          <div class="comment-header">
            <div class="comment-user">${comment.username}</div>
            <div class="comment-time">${commentTime}</div>
          </div>
          <div class="comment-text">${comment.comment}</div>
        `;
        
        commentsContainer.appendChild(commentElement);
      });
    })
    .catch(error => {
      console.error('Error loading comments:', error);
      commentsContainer.innerHTML = '<div style="text-align: center; padding: 10px;">Error loading comments.</div>';
    });
}

// Function to submit a comment
function submitComment(postId, commentText) {
  if (!commentText.trim()) {
    alert('Please enter a comment.');
    return;
  }
  
  fetch('add_comment.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post_id: postId,
      comment: commentText
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Update comment count
      const commentCountEl = document.querySelector(`.comment-btn[data-post-id="${postId}"] .comment-count`);
      commentCountEl.textContent = parseInt(commentCountEl.textContent) + 1;
      
      // Reload comments to show the new one
      loadComments(postId);
    } else {
      alert('Error: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error submitting your comment. Please try again later.');
  });
}

// Format time ago function
function formatTimeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + " year" + (interval === 1 ? "" : "s") + " ago";
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " month" + (interval === 1 ? "" : "s") + " ago";
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " day" + (interval === 1 ? "" : "s") + " ago";
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
  }
  
  return "just now";
}

// Handle filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
    });
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Update current filter
    currentFilter = btn.dataset.filter;
    
    // Reload posts with filter
    loadPosts();
  });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', checkLoginStatus);