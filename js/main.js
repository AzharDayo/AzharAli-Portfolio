// Strict mode for better error catching and security
'use strict';

// Sanitize input function
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Mobile navigation toggle with error handling
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        try {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        } catch (error) {
            console.error('Navigation toggle error:', error);
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        try {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        } catch (error) {
            console.error('Menu close error:', error);
        }
    }));
}

// Smooth scrolling with enhanced security
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        try {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            if (!targetId) return;
            
            const target = document.getElementById(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.error('Smooth scroll error:', error);
        }
    });
});

// Contact form handling with security measures
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            // Get and sanitize form data
            const formData = new FormData(this);
            const name = sanitizeInput(formData.get('name'));
            const email = sanitizeInput(formData.get('email'));
            const subject = sanitizeInput(formData.get('subject'));
            const message = sanitizeInput(formData.get('message'));
            
            // Input validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation with strict regex
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulated form submission with timeout for demo
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
            this.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .about-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
    if (!element || typeof text !== 'string') return;
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        try {
            if (i < text.length) {
                element.innerHTML += sanitizeInput(text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        } catch (error) {
            console.error('Typing effect error:', error);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    try {
        const heroTitle = document.querySelector('.hero-text h1');
        const heroSubtitle = document.querySelector('.hero-text p');
        const heroDescription = document.querySelector('.hero-description p');
        
        if (heroTitle && heroSubtitle && heroDescription) {
            const titleText = heroTitle.textContent;
            const subtitleText = heroSubtitle.textContent;
            const descriptionText = heroDescription.textContent;
            
            typeWriter(heroTitle, titleText, 80);
            
            setTimeout(() => {
                typeWriter(heroSubtitle, subtitleText, 60);
            }, titleText.length * 80 + 500);
            
            setTimeout(() => {
                typeWriter(heroDescription, descriptionText, 40);
            }, (titleText.length * 80) + (subtitleText.length * 60) + 1000);
        }
    } catch (error) {
        console.error('Typing initialization error:', error);
    }
});

// Add click-to-contact functionality for contact items
document.addEventListener('DOMContentLoaded', () => {
    // Make email clickable
    const emailItems = document.querySelectorAll('.contact-item');
    emailItems.forEach(item => {
        const text = item.querySelector('span').textContent;
        if (text.includes('@')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                window.location.href = `mailto:${text}`;
            });
        }
        if (text.includes('+92') && text.includes('WhatsApp')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const phone = text.replace('WhatsApp: ', '').replace(/\s+/g, '');
                window.open(`https://wa.me/${phone.replace('+', '')}`, '_blank');
            });
        }
    });
});

// Add scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        try {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        } catch (error) {
            console.error('Scroll button visibility error:', error);
        }
    });
});

// Scroll to top with smooth behavior
scrollToTopBtn.addEventListener('click', () => {
    try {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } catch (error) {
        console.error('Scroll to top error:', error);
        // Fallback for older browsers
        window.scrollTo(0, 0);
    }
});