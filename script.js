// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
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

// Observe all sections for fade-in effect
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Animated counters for evaluation criteria
function animateCounters() {
    const counters = document.querySelectorAll('.progress-fill');
    counters.forEach(counter => {
        const targetWidth = counter.style.width;
        counter.style.width = '0%';
        setTimeout(() => {
            counter.style.width = targetWidth;
        }, 500);
    });
}

// Trigger counter animation when evaluation section is visible
const evaluationSection = document.querySelector('#evaluation');
if (evaluationSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counterObserver.observe(evaluationSection);
}

// Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Trigger timeline animation when timeline section is visible
const timelineSection = document.querySelector('#timeline');
if (timelineSection) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    timelineObserver.observe(timelineSection);
}

// Initialize timeline items as hidden
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Chatbot toggle functionality
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotWindow = document.querySelector('.chatbot-window');

if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatbotToggle.contains(e.target) && !chatbotWindow.contains(e.target)) {
            chatbotWindow.style.display = 'none';
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        const setExpandedState = (isOpen) => {
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            navLinks.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        };

        const closeMenu = () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            setExpandedState(false);
        };

        const toggleMenu = () => {
            const isOpen = !navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            setExpandedState(isOpen);
        };

        // Initialize ARIA state
        setExpandedState(false);

        hamburger.addEventListener('click', toggleMenu);

        // Keyboard accessibility
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                closeMenu();
            }
        });

        // Reset menu on resize back to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
                navLinks.removeAttribute('aria-hidden');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Performance optimization: Debounce scroll events
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

// Countdown timer for registration deadline
function initCountdown() {
    const countdownDate = new Date('2026-01-20T23:59:59').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('countdown').innerHTML = '<div class="countdown-expired">Registration Closed</div>';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Apply debounced scroll handler
window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based animations can be added here
}, 10));

// Initialize countdown on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCountdown();
});
