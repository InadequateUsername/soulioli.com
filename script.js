// Enhanced script for Free Media page

document.addEventListener('DOMContentLoaded', function() {
  // Check login status
  checkLoginStatus();
  
  // Set up navigation
  setupNavigation();
  
  // Add sparkle effects to warning boxes
  addSparkleEffects();
  
  // Add smooth scrolling
  setupSmoothScrolling();
  
  // Add "Back to Top" button
  addBackToTopButton();
});

/**
 * Check login status and update user status display
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
 * Set up navigation functionality
 */
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');
  const currentSectionLabel = document.getElementById('current-section');
  
  // Handle navigation item clicks
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all nav items
      navItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      // Add active class to clicked nav item
      this.classList.add('active');
      
      // Get the target section
      const targetId = this.getAttribute('data-target');
      
      // Hide all content sections
      contentSections.forEach(section => {
        section.classList.remove('active');
      });
      
      // Show the target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
        
        // Update the breadcrumb
        if (currentSectionLabel) {
          currentSectionLabel.textContent = this.textContent.trim();
        }
        
        // Update the right panel quick links
        updateQuickLinks(targetId);
      }
    });
  });
  
  // Setup right panel quick links
  setupQuickLinks();
}

/**
 * Update quick links in the right panel based on active section
 */
function updateQuickLinks(sectionId) {
  const quickLinks = document.getElementById('page-sections');
  
  if (!quickLinks) return;
  
  // Clear existing links
  quickLinks.innerHTML = '';
  
  // Add section specific links
  switch(sectionId) {
    case 'streaming-sites':
      quickLinks.innerHTML = `
        <li class="active"><a href="#streaming-sites">Streaming Sites</a></li>
        <li><a href="#free-with-ads">Free w/ Ads</a></li>
        <li><a href="#anime-streaming">Anime Streaming</a></li>
        <li><a href="#cartoon-streaming">Cartoon Streaming</a></li>
        <li><a href="#tv-streaming">TV Streaming</a></li>
      `;
      break;
    case 'music-audio':
      quickLinks.innerHTML = `
        <li class="active"><a href="#music-streaming">Music Streaming</a></li>
        <li><a href="#podcasts">Podcasts</a></li>
        <li><a href="#music-downloads">Music Downloads</a></li>
        <li><a href="#audio-tools">Audio Tools</a></li>
      `;
      break;
    case 'books-reading':
      quickLinks.innerHTML = `
        <li class="active"><a href="#ebooks">E-Books</a></li>
        <li><a href="#audiobooks">Audiobooks</a></li>
        <li><a href="#academic-resources">Academic Resources</a></li>
        <li><a href="#reading-tools">Reading Tools</a></li>
      `;
      break;
    case 'educational':
      quickLinks.innerHTML = `
        <li class="active"><a href="#online-courses">Online Courses</a></li>
        <li><a href="#educational-videos">Educational Videos</a></li>
        <li><a href="#language-learning">Language Learning</a></li>
        <li><a href="#tutorials">Tutorials</a></li>
      `;
      break;
    case 'sailors-guide':
      quickLinks.innerHTML = `
        <li class="active"><a href="#getting-started">Getting Started</a></li>
        <li><a href="#website-navigation">Website Navigation</a></li>
        <li><a href="#streaming-terms">Streaming Terms</a></li>
        <li><a href="#beginner-resources">Beginner Resources</a></li>
      `;
  break;
    // Add more sections as needed
    default:
      quickLinks.innerHTML = `
        <li class="active"><a href="#${sectionId}">${sectionId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</a></li>
      `;
  }
}

/**
 * Set up quick links in the right panel
 */
function setupQuickLinks() {
  const quickLinks = document.getElementById('page-sections');
  
  if (!quickLinks) return;
  
  // Add click event listeners to quick links
  quickLinks.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      
      // Remove active class from all links
      document.querySelectorAll('#page-sections li').forEach(li => {
        li.classList.remove('active');
      });
      
      // Add active class to clicked link's parent
      e.target.parentElement.classList.add('active');
      
      // Scroll to the target section
      const targetId = e.target.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

/**
 * Add sparkle effects to warning boxes
 */
function addSparkleEffects() {
  const warningBoxes = document.querySelectorAll('.warning-box');
  
  warningBoxes.forEach(box => {
    // Add multiple sparkles
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      
      // Random position within the box
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      sparkle.style.top = `${top}%`;
      sparkle.style.left = `${left}%`;
      
      // Random animation delay
      const delay = Math.random() * 3;
      sparkle.style.animation = `sparkle 2s infinite ${delay}s`;
      
      // Add to the box
      box.appendChild(sparkle);
    }
  });
}

/**
 * Set up smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  // Select all links in the right sidebar that begin with '#'
  document.querySelectorAll('.info-panel a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target section ID from the href attribute
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Scroll to the target section smoothly
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active state in the sidebar
        document.querySelectorAll('.info-panel .quick-links li').forEach(li => {
          li.classList.remove('active');
        });
        this.closest('li').classList.add('active');
      }
    });
  });
}

/**
 * Add "Back to Top" button
 */
function addBackToTopButton() {
  // Create button element
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