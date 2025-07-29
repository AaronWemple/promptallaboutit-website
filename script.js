// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
        
        // Keyboard navigation for hamburger
        hamburger.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navMenu.classList.toggle('active');
            }
        });
    }
    
    // Contact Form Validation and Submission
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset previous errors
            clearErrors();
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                showError('name-error', 'Name is required');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError('name-error', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError('email-error', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError('message-error', 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError('message-error', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If all validations pass
            if (isValid) {
                // Create mailto link with form data
                const subject = encodeURIComponent('Green AI Contact Form Submission - Prompt All About It');
                const body = encodeURIComponent(
                    `Name: ${name.value.trim()}\n` +
                    `Email: ${email.value.trim()}\n` +
                    `Interest: ${document.getElementById('interest').value || 'Not specified'}\n` +
                    `Barriers: ${document.getElementById('barriers').value.trim() || 'None specified'}\n\n` +
                    `Message:\n${message.value.trim()}`
                );
                
                const mailtoLink = `mailto:1800NewFree@gmail.com?subject=${subject}&body=${body}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Clear form
                document.getElementById('contact-form').style.display = 'none';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Helper functions
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation to buttons on click
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Only add loading state to submit buttons
            if (this.id === 'submit-btn') {
                this.style.opacity = '0.7';
                this.textContent = 'Sending Green Message...';
                
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.textContent = 'Send Green Message';
                }, 2000);
            }
        });
    });
    
    // Accessibility: Announce dynamic content changes
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Add screen reader only class for accessibility
    const style = document.createElement('style');
    style.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(style);
});