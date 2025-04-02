// Global JavaScript for soulioli.com

/**
 * Check login status and update the user status display
 */
function checkLoginStatus() {
  fetch('/check_login.php')
    .then(response => response.json())
    .then(data => {
      const userStatusElement = document.getElementById('user-status');
      
      if (userStatusElement) {
        if (data.loggedin) {
          // User is logged in - display username and logout link
          userStatusElement.innerHTML = `
            <span><i class="fas fa-user"></i> ${data.username}</span>
            <a href="/logout.php" class="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
          `;
        } else {
          // User is not logged in - display login link
          userStatusElement.innerHTML = `
            <a href="/login.php" class="home-link"><i class="fas fa-sign-in-alt"></i> Login / Register</a>
          `;
        }
      }
    })
    .catch(error => {
      console.error('Error checking login status:', error);
    });
}

/**
 * Add "Back to Top" button
 */
function addBackToTopButton() {
  // Create the button element
  const button = document.createElement('button');
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = 'back-to-top';
  
  // Style the button
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.display = 'none';
  button.style.width = '50px';
  button.style.height = '50px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#bb86fc';
  button.style.color = '#121212';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.fontSize = '18px';
  button.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
  button.style.zIndex = '1000';
  button.style.transition = 'all 0.3s';
  
  // Add hover effect
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 15px rgba(0,0,0,0.4)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
  });
  
  // Add to the document
  document.body.appendChild(button);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });
  
  // Scroll to top when clicked
  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Add animation to elements when they scroll into view
 */
function addScrollAnimation() {
  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    // Elements to animate
    const elements = document.querySelectorAll('.card, .section-header, .form-group, .info-section');
    
    // Create options for the observer
    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.1 // 10% of the element is visible
    };
    
    // Callback function
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the animation class
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          
          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    };
    
    // Create the observer
    const observer = new IntersectionObserver(callback, options);
    
    // Prepare and observe each element
    elements.forEach(element => {
      // Set initial styles
      element.style.opacity = 0;
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      // Observe the element
      observer.observe(element);
    });
  }
}

/**
 * Initialize page enhancements
 */
function initializePageEnhancements() {
  // Add sparkle to elements with .sparkle-effect class
  const sparkleElements = document.querySelectorAll('.sparkle-effect');
  
  sparkleElements.forEach(element => {
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    // Add multiple sparkles
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      
      // Style the sparkle
      sparkle.style.position = 'absolute';
      sparkle.style.width = '4px';
      sparkle.style.height = '4px';
      sparkle.style.backgroundColor = '#bb86fc';
      sparkle.style.borderRadius = '50%';
      
      // Random position
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      sparkle.style.top = `${top}%`;
      sparkle.style.left = `${left}%`;
      
      // Random animation delay
      const delay = Math.random() * 3;
      sparkle.style.animation = `sparkle 2s infinite ${delay}s`;
      
      // Add to the element
      element.appendChild(sparkle);
    }
  });
  
  // Add sparkle animation to stylesheet
  if (!document.querySelector('#sparkle-animation')) {
    const style = document.createElement('style');
    style.id = 'sparkle-animation';
    style.textContent = `
      @keyframes sparkle {
        0% { transform: scale(1); opacity: 0; }
        50% { transform: scale(2); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Add neon pulse animation if not already added
  if (!document.querySelector('#neon-animation')) {
    const style = document.createElement('style');
    style.id = 'neon-animation';
    style.textContent = `
      @keyframes neon-pulse {
        from {
          text-shadow: 
            0 0 5px #ff69b4,
            0 0 10px #ff69b4, 
            0 0 20px #ff69b4;
        }
        to {
          text-shadow: 
            0 0 5px #ff69b4,
            0 0 10px #ff69b4, 
            0 0 20px #ff69b4,
            0 0 30px #ff69b4;
        }
      }
      
      h1 {
        animation: neon-pulse 2s infinite alternate;
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Initialize all features when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check login status
  checkLoginStatus();
  
  // Add "Back to Top" button
  addBackToTopButton();
  
  // Add scroll animations
  addScrollAnimation();
  
  // Initialize page enhancements
  initializePageEnhancements();
  
  // Add class to warning boxes for sparkle effect
  document.querySelectorAll('.warning-box').forEach(box => {
    box.classList.add('sparkle-effect');
  });
});