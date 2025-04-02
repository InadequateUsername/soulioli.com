// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Form validation
  const dmcaForm = document.querySelector('.dmca-form form');
  
  if (dmcaForm) {
    dmcaForm.addEventListener('submit', function(event) {
      // Get form fields
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const copyrightWork = document.getElementById('copyright_work').value.trim();
      const infringingMaterial = document.getElementById('infringing_material').value.trim();
      const goodFaith = document.getElementById('good_faith').value.trim();
      const accuracy = document.getElementById('accuracy').value.trim();
      const digitalSignature = document.getElementById('digital_signature').value.trim();
      
      // Create error message container if it doesn't exist
      let errorContainer = document.querySelector('.error-message');
      if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'error-message';
        dmcaForm.prepend(errorContainer);
        errorContainer.style.display = 'none';
      }
      
      // Reset error message
      errorContainer.innerHTML = '';
      errorContainer.style.display = 'none';
      
      // Validate form fields
      let errors = [];
      
      // Check required fields
      if (!name) errors.push('Full Name is required');
      if (!email) errors.push('Email Address is required');
      if (!copyrightWork) errors.push('Identification of Copyrighted Work is required');
      if (!infringingMaterial) errors.push('Identification of Infringing Material is required');
      if (!goodFaith) errors.push('Good Faith Statement is required');
      if (!accuracy) errors.push('Accuracy Statement is required');
      if (!digitalSignature) errors.push('Digital Signature is required');
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
      }
      
      // Check if digital signature matches name
      if (name && digitalSignature && digitalSignature !== name) {
        errors.push('Digital Signature must match your Full Name exactly');
      }
      
      // If there are errors, prevent form submission and display errors
      if (errors.length > 0) {
        event.preventDefault();
        
        // Create error list
        const errorList = document.createElement('ul');
        errors.forEach(error => {
          const errorItem = document.createElement('li');
          errorItem.textContent = error;
          errorList.appendChild(errorItem);
        });
        
        // Display errors
        errorContainer.innerHTML = '<strong>Please correct the following errors:</strong>';
        errorContainer.appendChild(errorList);
        errorContainer.style.display = 'block';
        
        // Scroll to error message
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
  
  // Character counter for textareas
  const textareas = document.querySelectorAll('textarea');
  
  textareas.forEach(textarea => {
    // Create character counter
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = `${textarea.value.length} characters`;
    counter.style.textAlign = 'right';
    counter.style.fontSize = '0.8em';
    counter.style.color = '#888';
    counter.style.marginTop = '5px';
    
    // Insert counter after textarea
    textarea.parentNode.insertBefore(counter, textarea.nextSibling);
    
    // Update counter on input
    textarea.addEventListener('input', function() {
      counter.textContent = `${this.value.length} characters`;
    });
  });
});