
// 1. Typewriter Effect
const roles = ["Frontend Developer", "UI Designer", "React Specialist", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeElement = document.getElementById("typewriter-text");

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typeElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
}

// Theme Toggle Logic
function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    // Apply initial saved theme (defaults to dark as requested)
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'light');
                navbar.style.background = 'rgba(240, 245, 255, 0.85)';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('portfolio-theme', 'dark');
                navbar.style.background = 'rgba(6, 9, 19, 0.85)';
            }
        });
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    if (typeElement) setTimeout(type, 1000);
    generateGithubGraph();
});

// 2. Intersection Observer for Fade-Up Animations
const fadeUpElements = document.querySelectorAll('.fade-up');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter animation if inside
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            });

            // Optional: Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeUpElements.forEach(el => observer.observe(el));

// 3. Counter Animation
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.innerText = target;
            clearInterval(timer);
        } else {
            counter.innerText = Math.ceil(current);
        }
    }, stepTime);
}

// 4. Sticky Navbar & Active Link Update
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id], section.hero');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenu = document.getElementById('mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });
});

window.addEventListener('scroll', () => {
    // Navbar blur background
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (window.scrollY > 50) {
        navbar.style.background = isDark ? 'rgba(6, 9, 19, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = isDark ? '0 10px 30px -10px rgba(0, 0, 0, 0.6)' : '0 10px 30px -10px rgba(99, 102, 241, 0.12)';
    } else {
        navbar.style.background = isDark ? 'rgba(6, 9, 19, 0.85)' : 'rgba(240, 245, 255, 0.85)';
        navbar.style.boxShadow = 'none';
    }

    // Active Link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// 6. Floating Dots Particle Background Canvas (Antigravity Light Dots effect)
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = Math.min(Math.floor(window.innerWidth / 8), 160);

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 1,
            color: Math.random() > 0.3 ? 'rgba(79, 70, 229, 0.45)' : 'rgba(124, 58, 237, 0.55)',
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        requestAnimationFrame(render);
    }

    render();
}

document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
});





