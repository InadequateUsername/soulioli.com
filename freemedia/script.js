// Check login status (from your original script)
function checkLoginStatus() {
  fetch('/check_login.php')
    .then(response => response.json())
    .then(data => {
      const userStatusElement = document.getElementById('user-status');
      
      if (data.loggedin) {
        // User is logged in - display username and logout link
        userStatusElement.innerHTML = `
          <span><i class="fas fa-user"></i> ${data.username}</span>
          <a href="/logout.php"><i class="fas fa-sign-out-alt"></i> Logout</a>
        `;
      } else {
        // User is not logged in - display login link
        userStatusElement.innerHTML = `
          <a href="/login.php"><i class="fas fa-sign-in-alt"></i> Login / Register</a>
        `;
      }
    })
    .catch(error => {
      console.error('Error checking login status:', error);
    });
}

// Add smooth scrolling to section links
function addSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Add hover effects to media links
function addHoverEffects() {
  const mediaLinks = document.querySelectorAll('.media-link');
  
  mediaLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 15px 30px rgba(187, 134, 252, 0.3)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
}

// Add a "back to top" button
function addBackToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = 'back-to-top';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.display = 'none';
  button.style.padding = '12px 16px';
  button.style.backgroundColor = '#bb86fc';
  button.style.color = '#121212';
  button.style.border = 'none';
  button.style.borderRadius = '50%';
  button.style.cursor = 'pointer';
  button.style.zIndex = '1000';
  button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
  
  document.body.appendChild(button);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });
  
  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Add category animation on scroll
function addScrollAnimation() {
  const categories = document.querySelectorAll('.category');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  categories.forEach(category => {
    category.style.opacity = 0;
    category.style.transform = 'translateY(50px)';
    category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(category);
  });
}

// Add night mode toggle
function addNightModeToggle() {
  const navContainer = document.querySelector('.nav-container');
  
  const nightModeToggle = document.createElement('button');
  nightModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  nightModeToggle.className = 'night-mode-toggle';
  nightModeToggle.style.backgroundColor = 'transparent';
  nightModeToggle.style.border = '1px solid #bb86fc';
  nightModeToggle.style.borderRadius = '50%';
  nightModeToggle.style.color = '#bb86fc';
  nightModeToggle.style.width = '40px';
  nightModeToggle.style.height = '40px';
  nightModeToggle.style.cursor = 'pointer';
  nightModeToggle.style.marginLeft = '15px';
  
  nightModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
      this.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      this.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
  
  navContainer.appendChild(nightModeToggle);
}

// Initialize all features when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  checkLoginStatus();
  addSmoothScrolling();
  addHoverEffects();
  addBackToTopButton();
  addScrollAnimation();
  
  // Uncomment if you want the night mode toggle
  // addNightModeToggle();
});

// Add sparkle effect to warning boxes
function addSparkleToWarning() {
  const warningBoxes = document.querySelectorAll('.warning-box');
  
  warningBoxes.forEach(box => {
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.position = 'absolute';
      sparkle.style.width = '4px';
      sparkle.style.height = '4px';
      sparkle.style.backgroundColor = '#ffcc00';
      sparkle.style.borderRadius = '50%';
      
      // Random position within the box
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      sparkle.style.top = `${top}%`;
      sparkle.style.left = `${left}%`;
      
      // Random animation delay
      const delay = Math.random() * 3;
      sparkle.style.animation = `sparkle 2s infinite ${delay}s`;
      
      box.style.position = 'relative';
      box.style.overflow = 'hidden';
      box.appendChild(sparkle);
    }
  });
  
  // Add keyframe animation to stylesheet
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkle {
      0% { transform: scale(1); opacity: 0; }
      50% { transform: scale(2); opacity: 1; }
      100% { transform: scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Call this function after DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add this with other initializations
  addSparkleToWarning();
});