// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const sunIcons = themeToggle.querySelectorAll('.sun-icon');
    
    if (theme === 'light') {
        moonIcon.style.display = 'block';
        sunIcons.forEach(icon => icon.style.display = 'none');
    } else {
        moonIcon.style.display = 'none';
        sunIcons.forEach(icon => icon.style.display = 'block');
    }
}

// ===== Mobile Menu =====
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== Sticky Nav Effect =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// ===== Form Handling =====
const orderForm = document.querySelector('.order__form');
if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: orderForm.querySelector('input[type="text"]').value,
            phone: orderForm.querySelector('input[type="tel"]').value,
            address: orderForm.querySelector('textarea').value,
            quantity: orderForm.querySelector('input[type="number"]').value,
        };
        
        // Show modal instead of thanks message
        const modal = document.getElementById('orderModal');
        modal.classList.add('show');
        
        // Reset form after 2 seconds
        setTimeout(() => {
            orderForm.reset();
            modal.classList.remove('show');
        }, 3000);
        
        console.log('Order submitted:', formData);
    });
}

// ===== Modal Handling =====
const orderModal = document.getElementById('orderModal');
const modalClose = document.querySelector('.modal__close');

if (modalClose) {
    modalClose.addEventListener('click', () => {
        orderModal.classList.remove('show');
    });
}

if (orderModal) {
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.remove('show');
        }
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation to sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== Lazy Load Images (if added) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Esc key closes mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

console.log('Website script loaded successfully!');
