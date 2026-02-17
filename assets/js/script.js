// Portfolio JavaScript - Professional & Optimized

// ============================================
// 1. MOBILE MENU FUNCTIONALITY
// ============================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navlist = document.querySelector('.navlist');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navlist.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
        // Toggle icon between bars and times
        if (navlist.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navlist.classList.remove('active');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navlist.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navlist.classList.remove('active');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// ============================================
// 2. SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 3. SCROLL TO TOP BUTTON
// ============================================
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// 4. NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// 5. SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.skill-card, .project-card, .education-card, .certification-card, .about-img, .about-text'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// 6. TYPING EFFECT FOR HERO TEXT
// ============================================
const heroTextElement = document.querySelector('.hero-text');
if (heroTextElement) {
    const originalText = heroTextElement.innerHTML;
    heroTextElement.style.opacity = '1';
    
    // Add a subtle fade-in for hero section
    setTimeout(() => {
        document.querySelector('.hero-content').style.animation = 'fadeIn 1s ease-out';
    }, 100);
}

// ============================================
// 7. ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.navlist a[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.navlist a').forEach(link => {
                link.style.color = 'rgba(255, 255, 255, 0.637)';
            });
            navLink.style.color = '#FA8938';
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// 8. LAZY LOADING IMAGES
// ============================================
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ============================================
// 9. PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ============================================
function debounce(func, wait = 10) {
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

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(highlightNavLink, 10));

// ============================================
// 10. FORM VALIDATION (if you add a contact form later)
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// 11. PRELOADER (Optional - uncomment if needed)
// ============================================
/*
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
*/

// ============================================
// 12. CONSOLE MESSAGE (Professional Touch)
// ============================================
console.log('%c👋 Hey there, Developer!', 'color: #FA8938; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repo!', 'color: #6b7280; font-size: 14px;');
console.log('%c🚀 Built with passion by Asim', 'color: #FA8938; font-size: 14px;');

// ============================================
// 13. INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize any third-party libraries here
    console.log('Portfolio initialized successfully! ✨');
});
