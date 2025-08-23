// ===================================
// DR. SAM LI WEIXIAN - PROFESSIONAL WEBSITE
// Modern JavaScript with ES6+ features
// ===================================

// ===================================
// GLOBAL FUNCTIONS
// ===================================

// Notification System
function showNotification(message, type = 'info', duration = 6000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set notification content
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${getNotificationIcon(type)}
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" aria-label="Close notification">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        maxWidth: '400px',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
    });
    
    // Set colors based on type
    const colors = {
        success: {
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white'
        },
        error: {
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white'
        },
        info: {
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white'
        }
    };
    
    notification.style.background = colors[type].background;
    notification.style.color = colors[type].color;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    });
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => closeNotification(notification));
    
    // Auto close
    setTimeout(() => {
        closeNotification(notification);
    }, duration);
    
    // Click to close
    notification.addEventListener('click', () => closeNotification(notification));
}

function closeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>`,
        error: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>`,
        info: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>`
    };
    return icons[type] || icons.info;
}

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // GLOBAL VARIABLES
    // ===================================
    
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    
    // ===================================
    // MOBILE MENU FUNCTIONALITY
    // ===================================
    
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? '' : 'hidden';
    }
    
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    // Event listeners for mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }
    
    // Close menu when clicking on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // ===================================
    // NAVBAR SCROLL EFFECTS
    // ===================================
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // ===================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===================================
    
    function smoothScrollTo(target, offset = 80) {
        const targetElement = document.querySelector(target);
        
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Handle anchor link clicks
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            smoothScrollTo(href);
            closeMobileMenu();
        });
    });
    
    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('services-grid') || 
                    entry.target.classList.contains('achievement-cards') ||
                    entry.target.classList.contains('speaking-stats')) {
                    
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(`
        .hero-content,
        .hero-visual,
        .section,
        .service-card,
        .timeline-item,
        .achievement-card,
        .stat-card,
        .services-grid,
        .achievement-cards,
        .speaking-stats
    `);
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // ===================================
    // CONTACT FORM HANDLING
    // ===================================
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value.trim();
            });
            
            // Validate form
            const validation = validateForm(formObject);
            
            if (validation.isValid) {
                // Show success message
                showNotification('Thank you! Your message has been sent successfully. I will respond within 24 hours.', 'success');
                
                // Reset form
                this.reset();
                
                // Simulate form submission (replace with actual submission logic)
                console.log('Form submitted:', formObject);
                
            } else {
                // Show error message
                showNotification(validation.message, 'error');
                
                // Focus on first invalid field
                if (validation.firstInvalidField) {
                    validation.firstInvalidField.focus();
                }
            }
        });
    }
    
    function validateForm(data) {
        const requiredFields = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email Address',
            message: 'Project Details'
        };
        
        // Remove previous error states
        document.querySelectorAll('.form-group input, .form-group textarea, .form-group select')
            .forEach(field => field.classList.remove('error'));
        
        let firstInvalidField = null;
        
        // Check required fields
        for (const [field, label] of Object.entries(requiredFields)) {
            const element = document.querySelector(`[name="${field}"]`);
            
            if (!data[field]) {
                element.classList.add('error');
                if (!firstInvalidField) {
                    firstInvalidField = element;
                }
                return {
                    isValid: false,
                    message: `Please fill in the ${label} field.`,
                    firstInvalidField
                };
            }
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailElement = document.querySelector('[name="email"]');
        
        if (!emailRegex.test(data.email)) {
            emailElement.classList.add('error');
            return {
                isValid: false,
                message: 'Please enter a valid email address.',
                firstInvalidField: emailElement
            };
        }
        
        // Validate message length
        if (data.message.length < 10) {
            const messageElement = document.querySelector('[name="message"]');
            messageElement.classList.add('error');
            return {
                isValid: false,
                message: 'Please provide more details about your project (at least 10 characters).',
                firstInvalidField: messageElement
            };
        }
        
        return { isValid: true };
    }
    
    // ===================================
    // BUTTON RIPPLE EFFECT
    // ===================================
    
    function createRippleEffect(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        Object.assign(ripple.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}px`,
            top: `${y}px`,
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none'
        });
        
        // Ensure button has relative positioning
        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // ===================================
    // LAZY LOADING FOR IMAGES
    // ===================================
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // ===================================
    // COPY TO CLIPBOARD FUNCTIONALITY
    // ===================================
    
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Copied to clipboard!', 'success', 2000);
            }).catch(() => {
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }
    
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Copied to clipboard!', 'success', 2000);
        } catch (err) {
            showNotification('Unable to copy to clipboard', 'error', 3000);
        }
        
        textArea.remove();
    }
    
    // Add copy functionality to email links
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (e.shiftKey) {
                e.preventDefault();
                const email = this.href.replace('mailto:', '');
                copyToClipboard(email);
            }
        });
    });
    
    // ===================================
    // KEYBOARD NAVIGATION ENHANCEMENTS
    // ===================================
    
    // Focus management for mobile menu
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        e.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        e.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
        });
    }
    
    // Apply focus trapping to mobile menu
    if (navMenu) {
        trapFocus(navMenu);
    }
    
    // ===================================
    // EASTER EGG - KONAMI CODE
    // ===================================
    
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showNotification('🎉 You found the secret! Dr. Sam Li appreciates your attention to detail!', 'success', 5000);
                konamiIndex = 0;
                
                // Add a special animation
                document.body.style.animation = 'rainbow 2s linear';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 2000);
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // ===================================
    // ANALYTICS AND TRACKING
    // ===================================
    
    function trackEvent(category, action, label = '') {
        // Google Analytics tracking (replace with your tracking ID)
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        
        // Console logging for development
        console.log(`Analytics Event: ${category} - ${action} - ${label}`);
    }
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.id || 'unknown';
            trackEvent('Button Click', buttonText, section);
        });
    });
    
    // Track form submissions
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('Form', 'Contact Form Submission', 'Contact');
        });
    }
    
    // Track scroll depth
    let maxScrollPercentage = 0;
    const trackScrollDepth = throttle(function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScrollPercentage) {
            maxScrollPercentage = scrollPercent;
            
            // Track milestone percentages
            if ([25, 50, 75, 100].includes(scrollPercent)) {
                trackEvent('Scroll Depth', `${scrollPercent}%`, window.location.pathname);
            }
        }
    }, 1000);
    
    window.addEventListener('scroll', trackScrollDepth);
    
    // ===================================
    // INITIALIZATION COMPLETE
    // ===================================
    
    console.log('🚀 Dr. Sam Li Weixian website loaded successfully!');
    console.log('💡 Tip: Shift+click on email links to copy them to clipboard');
    
    // Show loading complete notification (optional)
    setTimeout(() => {
        showNotification('Welcome! Feel free to explore and reach out for AI governance consulting.', 'info', 4000);
    }, 1000);
    
});

// ===================================
// EMAIL FUNCTIONALITY
// ===================================

function sendEmail(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    
    // Handle both name formats (for compatibility)
    let name = formData.get('name');
    if (!name) {
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        name = `${firstName || ''} ${lastName || ''}`.trim();
    }
    
    const email = formData.get('email');
    const company = formData.get('company');
    const role = formData.get('role');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Validate required fields
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error', 3000);
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error', 3000);
        return;
    }
    
    // Create email content
    const subject = `AI Governance Consultation Inquiry from ${name}`;
    const emailBody = `Dear Dr. Sam Li Weixian,

I am interested in your AI governance and consulting services.

Contact Details:
- Name: ${name}
- Email: ${email}
- Company: ${company || 'Not specified'}
- Role: ${role || 'Not specified'}
- Service Interest: ${service || 'Not specified'}

Project Details:
${message}

I look forward to hearing from you.

Best regards,
${name}`;
    
    // Show email modal instead of trying mailto
    showEmailModal(subject, emailBody, name, email);
    
    // Track the event
    if (typeof trackEvent === 'function') {
        trackEvent('Contact', 'Email Form Generated', 'Success');
    }
}

function showEmailModal(subject, emailBody, name, email) {
    // Create encoded mailto URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(emailBody);
    const mailtoUrl = `mailto:sam.li@digitaile.com?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        max-width: 700px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        animation: slideIn 0.3s ease;
    `;
    
    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <h3 style="margin: 0 0 10px 0; color: #1a202c; font-size: 24px;">📧 Your Message is Ready!</h3>
            <p style="color: #718096; margin: 0;">Choose how you'd like to send your consultation inquiry to Dr. Sam Li</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">📧</div>
                <div>
                    <div style="font-weight: bold; font-size: 16px;">To: sam.li@digitaile.com</div>
                    <div style="opacity: 0.9; font-size: 14px;">Subject: ${subject}</div>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
            <button onclick="openEmailApp()" style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white; border: none; padding: 15px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.2s;">
                📧 Open Email App
            </button>
            <button onclick="copyEmailDetails()" style="background: linear-gradient(135deg, #48bb78, #38a169); color: white; border: none; padding: 15px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.2s;">
                📋 Copy Email
            </button>
        </div>
        
        <div style="background: #f7fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 15px 0; color: #2d3748; font-size: 16px;">📝 Email Preview:</h4>
            <textarea readonly style="width: 100%; height: 200px; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5; background: white; resize: vertical;">${emailBody}</textarea>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div style="color: #718096; font-size: 14px;">💡 Tip: You can also reply directly to this email thread</div>
            <button onclick="closeModal()" style="background: #718096; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: 500;">Close</button>
        </div>
        
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        </style>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Add global functions for the modal
    window.openEmailApp = function() {
        try {
            // Try multiple methods to open email
            const link = document.createElement('a');
            link.href = mailtoUrl;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification('Opening your email application...', 'success', 4000);
        } catch (error) {
            // Fallback
            window.location.href = mailtoUrl;
        }
    };
    
    window.copyEmailDetails = function() {
        const fullEmailText = `To: sam.li@digitaile.com\nSubject: ${subject}\n\n${emailBody}`;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(fullEmailText).then(() => {
                showNotification('📋 Email details copied to clipboard! Paste into your email app.', 'success', 5000);
            }).catch(() => {
                fallbackCopy(fullEmailText);
            });
        } else {
            fallbackCopy(fullEmailText);
        }
    };
    
    window.closeModal = function() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
        
        // Reset form
        const form = document.getElementById('contact-form');
        if (form) {
            form.reset();
            showNotification('Thank you! Your inquiry has been prepared for Dr. Sam Li.', 'success', 4000);
        }
    };
    
    function fallbackCopy(text) {
        // Create temporary textarea for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showNotification('📋 Email details copied! Paste into your email app.', 'success', 5000);
        } catch (err) {
            showNotification('Please manually copy the email content above', 'info', 5000);
        }
        
        document.body.removeChild(textarea);
    }
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            window.closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            window.closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    // Add fadeOut animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function showEmailFallback(emailText) {
    // Create a modal or alert with email details
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
    `;
    
    content.innerHTML = `
        <h3 style="margin-top: 0; color: #333;">Copy Email Details</h3>
        <p style="color: #666;">Please copy the text below and paste it into your email client:</p>
        <textarea readonly style="width: 100%; height: 200px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-family: monospace; font-size: 12px;">${emailText}</textarea>
        <div style="margin-top: 20px; text-align: right;">
            <button onclick="this.closest('.modal').remove()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close</button>
        </div>
    `;
    
    modal.className = 'modal';
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Select the text for easy copying
    const textarea = content.querySelector('textarea');
    textarea.select();
    textarea.focus();
}

// ===================================
// CSS ANIMATIONS FOR JAVASCRIPT
// ===================================

// Inject additional CSS for JavaScript animations
const additionalCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
    }
    
    .notification-icon {
        flex-shrink: 0;
    }
    
    .notification-message {
        flex: 1;
        font-weight: 500;
        line-height: 1.4;
    }
    
    .notification-close {
        flex-shrink: 0;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #ef4444;
        background-color: rgba(239, 68, 68, 0.05);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    img[data-src] {
        opacity: 0;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);