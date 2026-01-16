// ===================================
// Navbar Functionality
// ===================================

// Sticky navbar on scroll
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Form Validation & Submission
// ===================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Validation functions
function validateName(name) {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
        return 'Nama tidak boleh kosong';
    }
    if (trimmedName.length < 3) {
        return 'Nama minimal 3 karakter';
    }
    return '';
}

function validateEmail(email) {
    const trimmedEmail = email.trim();
    if (trimmedEmail.length === 0) {
        return 'Email tidak boleh kosong';
    }
    
    // Regex untuk validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        return 'Format email tidak valid';
    }
    return '';
}

function validateMessage(message) {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
        return 'Pesan tidak boleh kosong';
    }
    if (trimmedMessage.length < 10) {
        return 'Pesan minimal 10 karakter';
    }
    return '';
}

// Show error message
function showError(inputElement, errorElement, message) {
    errorElement.textContent = message;
    inputElement.style.borderColor = message ? 'var(--error-color)' : 'var(--border-color)';
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    showError(nameInput, document.getElementById('nameError'), error);
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    showError(emailInput, document.getElementById('emailError'), error);
});

messageInput.addEventListener('blur', () => {
    const error = validateMessage(messageInput.value);
    showError(messageInput, document.getElementById('messageError'), error);
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const messageError = validateMessage(messageInput.value);
    
    // Show errors
    showError(nameInput, document.getElementById('nameError'), nameError);
    showError(emailInput, document.getElementById('emailError'), emailError);
    showError(messageInput, document.getElementById('messageError'), messageError);
    
    // If no errors, submit form
    if (!nameError && !emailError && !messageError) {
        // Simulate form submission
        // In production, you would send data to server here
        console.log('Form Data:', {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        });
        
        // Show success message
        successMessage.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Reset border colors
        nameInput.style.borderColor = 'var(--border-color)';
        emailInput.style.borderColor = 'var(--border-color)';
        messageInput.style.borderColor = 'var(--border-color)';
    }
});

// ===================================
// Intersection Observer for Animations
// ===================================

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

// Observe feature cards and other elements
const featureCards = document.querySelectorAll('.feature-card');
const aboutContent = document.querySelector('.about-content');
const aboutImage = document.querySelector('.about-image');

featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

if (aboutContent) {
    aboutContent.style.opacity = '0';
    aboutContent.style.transform = 'translateX(-30px)';
    aboutContent.style.transition = 'all 0.6s ease';
    observer.observe(aboutContent);
}

if (aboutImage) {
    aboutImage.style.opacity = '0';
    aboutImage.style.transform = 'translateX(30px)';
    aboutImage.style.transition = 'all 0.6s ease 0.2s';
    observer.observe(aboutImage);
}

// ===================================
// Stats Counter Animation
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when in viewport
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                // Handle numbers with + or %
                const match = text.match(/(\d+)/);
                if (match) {
                    const number = parseInt(match[1]);
                    const originalText = text;
                    stat.textContent = '0';
                    
                    // Animate counter
                    let current = 0;
                    const increment = number / 100;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            stat.textContent = originalText;
                            clearInterval(timer);
                        } else {
                            const displayNumber = Math.floor(current);
                            if (originalText.includes('+')) {
                                stat.textContent = displayNumber + '+';
                            } else if (originalText.includes('%')) {
                                stat.textContent = displayNumber + '%';
                            } else {
                                stat.textContent = displayNumber;
                            }
                        }
                    }, 20);
                }
            });
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ===================================
// Utility Functions
// ===================================

// Prevent default behavior for demo links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Log page load
console.log('NexaCore Landing Page - Loaded Successfully');
console.log('All systems operational ✓');