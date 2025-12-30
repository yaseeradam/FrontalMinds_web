/**
 * FrontalMinds - Main JavaScript
 * Interactive features and 3D brain animation
 */

// ============================================
// MOBILE NAVIGATION
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ============================================
// NEWSLETTER FORM
// ============================================
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;

        // Simulate form submission
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d9ff 100%)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            newsletterForm.reset();
        }, 3000);
    });
}

// ============================================
// THREE.JS - 3D WIREFRAME BRAIN ANIMATION
// ============================================
function initBrainAnimation() {
    const canvas = document.getElementById('brain-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create brain-like shape using sphere with distortion
    const geometry = new THREE.IcosahedronGeometry(1.2, 4);

    // Distort vertices to create brain-like bumps
    const positions = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);

        // Add some noise to create brain-like folds
        const noise = Math.sin(vertex.x * 3) * 0.1 +
            Math.cos(vertex.y * 2) * 0.08 +
            Math.sin(vertex.z * 4) * 0.05;

        vertex.normalize().multiplyScalar(1.2 + noise);
        positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geometry.computeVertexNormals();

    // Wireframe material with gradient-like effect
    const material = new THREE.MeshBasicMaterial({
        color: 0x00d9ff,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });

    const brain = new THREE.Mesh(geometry, material);
    scene.add(brain);

    // Add inner glow sphere
    const glowGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.1
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positionsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positionsArray[i] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x00d9ff,
        size: 0.02,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Neural connection lines
    const linesGroup = new THREE.Group();
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00d9ff,
        transparent: true,
        opacity: 0.2
    });

    // Create random connection lines
    for (let i = 0; i < 20; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const linePoints = [];

        // Start from a point on the brain surface
        const startTheta = Math.random() * Math.PI * 2;
        const startPhi = Math.random() * Math.PI;
        const startRadius = 1.2;

        const startX = startRadius * Math.sin(startPhi) * Math.cos(startTheta);
        const startY = startRadius * Math.sin(startPhi) * Math.sin(startTheta);
        const startZ = startRadius * Math.cos(startPhi);

        // End at a random point in space
        const endX = startX + (Math.random() - 0.5) * 2;
        const endY = startY + (Math.random() - 0.5) * 2;
        const endZ = startZ + (Math.random() - 0.5) * 2;

        linePoints.push(new THREE.Vector3(startX, startY, startZ));
        linePoints.push(new THREE.Vector3(endX, endY, endZ));

        lineGeometry.setFromPoints(linePoints);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        linesGroup.add(line);
    }

    scene.add(linesGroup);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;

        // Rotate brain
        brain.rotation.y += 0.003;
        brain.rotation.x = targetY * 0.3;
        brain.rotation.z = targetX * 0.1;

        // Glow pulse
        const time = Date.now() * 0.001;
        glow.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
        glowMaterial.opacity = 0.1 + Math.sin(time * 2) * 0.03;

        // Rotate particles
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;

        // Animate connection lines
        linesGroup.rotation.y = brain.rotation.y;
        linesGroup.rotation.x = brain.rotation.x * 0.5;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// Old brain animation disabled - using premium version in brain-animation.js
// document.addEventListener('DOMContentLoaded', initBrainAnimation);

// ============================================
// HOVER EFFECTS FOR CARDS
// ============================================
document.querySelectorAll('.expertise-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function (e) {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// TYPING EFFECT (Optional enhancement)
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGlow = document.querySelector('.hero-glow');
    const bgGrid = document.querySelector('.hero-bg-grid');

    if (heroGlow) {
        heroGlow.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.2}px))`;
    }

    if (bgGrid) {
        bgGrid.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
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

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        // Show loading state
        btn.innerHTML = `
            <span>Sending...</span>
            <svg class="btn-icon spinning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
            </svg>
        `;
        btn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            btn.innerHTML = `
                <span>Message Sent!</span>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            `;
            btn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d9ff 100%)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}

// ============================================
// CASE STUDY FILTER TAGS
// ============================================
const filterTags = document.querySelectorAll('.filter-tag');
const caseCards = document.querySelectorAll('.case-card');

filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Update active state
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        const filter = tag.dataset.filter;

        // Filter cards
        caseCards.forEach(card => {
            const category = card.dataset.category || '';

            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ============================================
// SPINNING ANIMATION FOR LOADING
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .spinning {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

console.log('FrontalMinds website loaded successfully! 🧠');
