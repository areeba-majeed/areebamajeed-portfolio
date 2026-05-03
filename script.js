
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

// Initialize Typewriter
document.addEventListener("DOMContentLoaded", () => {
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
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
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

// 5. Generate Mock GitHub Graph
function generateGithubGraph() {
    const graphContainer = document.getElementById('gh-graph');
    if (!graphContainer) return;

    const totalBlocks = 150; // Approximating a few months of blocks
    for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement('div');
        block.className = 'gh-block';

        // Randomly assign a level
        const rand = Math.random();
        if (rand > 0.9) block.classList.add('l4');
        else if (rand > 0.8) block.classList.add('l3');
        else if (rand > 0.6) block.classList.add('l2');
        else if (rand > 0.4) block.classList.add('l1');

        graphContainer.appendChild(block);
    }
}




