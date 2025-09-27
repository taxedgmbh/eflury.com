/* ========================================
   Emanuel Flury - Professional Website
   Main JavaScript Functionality
   ======================================== */

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_eflury', // EmailJS service ID
    templateId: 'template_contact', // EmailJS template ID
    publicKey: 'your_public_key' // EmailJS public key (configure in production)
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupScrollIndicator();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupFAQAccordion();
    setupContactForm();
    setupNavbarScroll();
    setupBlogExpansion();
    setupAnalyticsTracking();
}

// Scroll Progress Indicator
function setupScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        document.getElementById('scrollIndicator').style.transform = `scaleX(${scrollPercent})`;
    });
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// Fade in Animation on Scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// FAQ Accordion Functionality
function setupFAQAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Contact Form Handling
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    // Real-time validation
    setupFormValidation();
    
    // Character counter for message
    setupCharacterCounter();
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        showLoadingState(true);
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            service: formData.get('service'),
            message: formData.get('message'),
            privacy: formData.get('privacy')
        };
        
        // Track form submission in analytics
        if (window.trackContactFormSubmission) {
            window.trackContactFormSubmission(data.service || 'general');
        }
        
        // Send email using EmailJS
        sendEmail(data);
    });
}

// Form Validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${getFieldLabel(fieldName)} is required.`;
        isValid = false;
    }
    
    // Specific field validations
    if (value && fieldName === 'name') {
        if (value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long.';
            isValid = false;
        }
    }
    
    if (value && fieldName === 'email') {
        if (!isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
        }
    }
    
    if (value && fieldName === 'message') {
        if (value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long.';
            isValid = false;
        }
    }
    
    if (fieldName === 'privacy' && !field.checked) {
        errorMessage = 'You must agree to the privacy policy.';
        isValid = false;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.classList.add('show');
        errorElement.textContent = message;
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Full Name',
        'email': 'Email Address',
        'message': 'Message',
        'privacy': 'Privacy Agreement'
    };
    return labels[fieldName] || fieldName;
}

// Character Counter
function setupCharacterCounter() {
    const messageField = document.querySelector('#message');
    const charCount = document.querySelector('#charCount');
    
    if (messageField && charCount) {
        messageField.addEventListener('input', updateCharacterCount);
        updateCharacterCount();
    }
}

function updateCharacterCount() {
    const messageField = document.querySelector('#message');
    const charCount = document.querySelector('#charCount');
    
    if (messageField && charCount) {
        const count = messageField.value.length;
        charCount.textContent = count;
        
        if (count > 800) {
            charCount.style.color = '#ff6b6b';
        } else if (count > 600) {
            charCount.style.color = '#f59e0b';
        } else {
            charCount.style.color = 'rgba(255, 255, 255, 0.6)';
        }
    }
}

// Loading State
function showLoadingState(show) {
    const submitBtn = document.querySelector('#submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (show) {
        submitBtn.disabled = true;
        btnText.classList.add('hide');
        btnLoading.classList.add('show');
    } else {
        submitBtn.disabled = false;
        btnText.classList.remove('hide');
        btnLoading.classList.remove('show');
    }
}

// Email Sending Function
function sendEmail(data) {
    const templateParams = {
        from_name: data.name,
        from_email: data.email,
        company: data.company || 'Not specified',
        service_interest: data.service || 'Not specified',
        message: data.message,
        to_name: 'Emanuel Flury'
    };
    
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showLoadingState(false);
            showNotification('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
            document.querySelector('.contact-form').reset();
            updateCharacterCount();
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            showLoadingState(false);
            showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        });
}

// Analytics Tracking Setup
function setupAnalyticsTracking() {
    // Track service interest clicks
    const serviceSelect = document.querySelector('#service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            if (this.value && window.trackServiceInterest) {
                window.trackServiceInterest(this.value);
            }
        });
    }
    
    // Track portfolio item views
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && window.trackPortfolioView) {
                    const projectTitle = entry.target.querySelector('h3')?.textContent || `Project ${index + 1}`;
                    window.trackPortfolioView(projectTitle);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(item);
    });
    
    // Track testimonial views
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && window.trackTestimonialView) {
                    window.trackTestimonialView();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        testimonials.forEach(testimonial => observer.observe(testimonial));
    }
    
    // Track FAQ interactions
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            if (window.gtag) {
                window.gtag('event', 'faq_interaction', {
                    'event_category': 'engagement',
                    'event_label': this.querySelector('h4')?.textContent || 'FAQ Question',
                    'value': 1
                });
            }
        });
    });
    
    // Track blog post expansions
    const blogExpandBtns = document.querySelectorAll('.expand-btn');
    blogExpandBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (window.gtag) {
                const postTitle = this.closest('.blog-post')?.querySelector('h3')?.textContent || 'Blog Post';
                window.gtag('event', 'blog_expand', {
                    'event_category': 'engagement',
                    'event_label': postTitle,
                    'value': 1
                });
            }
        });
    });
}

// Navbar Background on Scroll
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Blog Content Expansion
function setupBlogExpansion() {
    // This function handles blog content expansion if needed
    // Currently using inline onclick handlers in HTML
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #0891B2, #0F766E)';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Blog Content Toggle Function (called from HTML)
function toggleContent(button) {
    const content = button.closest('.blog-post').querySelector('.blog-content-expanded');
    const icon = button.querySelector('i');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Read Less';
        button.classList.add('expanded');
    } else {
        content.style.display = 'none';
        button.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
        button.classList.remove('expanded');
    }
}

// Performance Optimization
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.toggleContent = toggleContent;
