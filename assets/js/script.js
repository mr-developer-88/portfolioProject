// Portfolio JavaScript - Clean & Optimized

// ============================================
// 1. MOBILE MENU FUNCTIONALITY
// ============================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navlist = document.querySelector('.navlist');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navlist.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
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
            const offsetTop = target.offsetTop - 80;
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

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        navbar.classList.add('scrolled');
    } else {
        navbar.style.boxShadow = 'none';
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// 5. SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.skill-card, .project-card, .education-card, .certification-card, .about-img, .about-text'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    fadeObserver.observe(el);
});

// ============================================
// 6. ACTIVE NAV LINK ON SCROLL
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

// Debounce function for performance
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

window.addEventListener('scroll', debounce(highlightNavLink, 10));

// ============================================
// 7. LAZY LOADING IMAGES
// ============================================
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries) => {
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
// 8. CARD ANIMATIONS WITH STAGGER
// ============================================
const cards = document.querySelectorAll('.skill-card, .project-card, .education-card, .certification-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

cards.forEach(card => cardObserver.observe(card));

// ============================================
// 9. SECTION REVEAL ANIMATIONS
// ============================================
const allSections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

allSections.forEach(section => {
    if (!section.classList.contains('hero')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    }
});

// ============================================
// 10. BUTTON RIPPLE EFFECT
// ============================================
const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const existingRipple = button.getElementsByClassName('ripple')[0];
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
};

document.querySelectorAll('.pri-btn, .sec-btn, .hire-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ============================================
// 11. PERFORMANCE OPTIMIZATIONS
// ============================================

// Reduce motion for accessibility
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Touch device detection
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
} else {
    document.body.classList.add('no-touch');
}

// Viewport height fix for mobile
const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', debounce(setVH, 100));

// ============================================
// 12. INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    console.log('%c✨ Portfolio loaded successfully!', 'color: #FA8938; font-size: 16px; font-weight: bold;');
});
