/* ============================================
   PUSHPENDRA SINGH YADAV - PORTFOLIO
   Three.js 3D Scene + GSAP Animations + Interactions
   ============================================ */

// ========== PRELOADER ==========
const preloader = document.getElementById('preloader');
const preloaderFill = document.getElementById('preloader-fill');
const preloaderPercent = document.getElementById('preloader-percent');

let loadProgress = 0;
const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 15;
    if (loadProgress > 100) loadProgress = 100;
    preloaderFill.style.width = loadProgress + '%';
    preloaderPercent.textContent = Math.floor(loadProgress) + '%';
    if (loadProgress >= 100) {
        clearInterval(loadInterval);
        setTimeout(() => {
            preloader.classList.add('loaded');
            initAnimations();
        }, 500);
    }
}, 100);

// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

function animateCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for interactive elements
document.querySelectorAll('a, button, .project-card, .skill-card, .cert-card, .edu-card').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hover'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
});

// ========== THREE.JS 3D SCENE ==========
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

camera.position.z = 30;

// Particle System
const particleCount = 1500;
const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

    const color = new THREE.Color();
    color.setHSL(0.7 + Math.random() * 0.2, 0.6, 0.5 + Math.random() * 0.3);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = Math.random() * 2 + 0.5;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Floating Geometric Shapes
const geometries = [
    new THREE.IcosahedronGeometry(1.2, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.TorusGeometry(0.8, 0.3, 8, 16),
    new THREE.TorusKnotGeometry(0.7, 0.2, 64, 8),
];

const shapeMaterial = new THREE.MeshBasicMaterial({
    color: 0x6c5ce7,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
});

const shapes = [];
geometries.forEach((geo, i) => {
    const mesh = new THREE.Mesh(geo, shapeMaterial.clone());
    mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 - 10
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.userData = {
        rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 },
        floatSpeed: 0.3 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
    };
    scene.add(mesh);
    shapes.push(mesh);
});

// Hero 3D Object - Rotating Icosahedron
const heroGeo = new THREE.IcosahedronGeometry(5, 1);
const heroMat = new THREE.MeshBasicMaterial({
    color: 0x6c5ce7,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
});
const heroMesh = new THREE.Mesh(heroGeo, heroMat);
heroMesh.position.set(15, 0, -5);
scene.add(heroMesh);

// Inner glow sphere
const glowGeo = new THREE.IcosahedronGeometry(3.5, 1);
const glowMat = new THREE.MeshBasicMaterial({
    color: 0x00cec9,
    wireframe: true,
    transparent: true,
    opacity: 0.1,
});
const glowMesh = new THREE.Mesh(glowGeo, glowMat);
heroMesh.add(glowMesh);

// Connection Lines
const lineGeometry = new THREE.BufferGeometry();
const linePositions = new Float32Array(300 * 3);
lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x6c5ce7,
    transparent: true,
    opacity: 0.05,
});
const connectionLines = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(connectionLines);

// Mouse interaction
let targetMouseX = 0, targetMouseY = 0;
document.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Rotate particles
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;

    // Update particle positions for wave effect
    const pos = particleGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3 + 1] += Math.sin(time * 0.3 + pos[i3] * 0.05) * 0.003;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    // Animate floating shapes
    shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotSpeed.x;
        shape.rotation.y += shape.userData.rotSpeed.y;
        shape.position.y = shape.userData.baseY + Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 1.5;
    });

    // Hero mesh rotation
    heroMesh.rotation.x += 0.003;
    heroMesh.rotation.y += 0.005;
    glowMesh.rotation.x -= 0.005;
    glowMesh.rotation.y -= 0.003;

    // Mouse parallax on camera
    camera.position.x += (targetMouseX * 3 - camera.position.x) * 0.02;
    camera.position.y += (-targetMouseY * 2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    // Update connection lines between close particles
    let lineIndex = 0;
    const linePos = connectionLines.geometry.attributes.position.array;
    for (let i = 0; i < 50 && lineIndex < 300; i++) {
        for (let j = i + 1; j < 50 && lineIndex < 300; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 12) {
                linePos[lineIndex * 3] = pos[i * 3];
                linePos[lineIndex * 3 + 1] = pos[i * 3 + 1];
                linePos[lineIndex * 3 + 2] = pos[i * 3 + 2];
                lineIndex++;
                linePos[lineIndex * 3] = pos[j * 3];
                linePos[lineIndex * 3 + 1] = pos[j * 3 + 1];
                linePos[lineIndex * 3 + 2] = pos[j * 3 + 2];
                lineIndex++;
            }
        }
    }
    for (let i = lineIndex; i < 300; i++) {
        linePos[i * 3] = 0;
        linePos[i * 3 + 1] = 0;
        linePos[i * 3 + 2] = 0;
    }
    connectionLines.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========== GSAP ANIMATIONS ==========
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    // Hero animations
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
        .to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to('.hero-word', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
        }, 0.4)
        .to('.hero-roles', { opacity: 1, duration: 0.6 }, 1.2)
        .to('.hero-description', { opacity: 1, y: 0, duration: 0.6 }, 1.4)
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6 }, 1.6)
        .to('.hero-stats', { opacity: 1, y: 0, duration: 0.6 }, 1.8);

    // Counter animation
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        gsap.to(el, {
            textContent: target,
            duration: 2,
            delay: 2,
            snap: { textContent: 1 },
            ease: 'power2.out',
        });
    });

    // Section animations with ScrollTrigger
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
        });
    });

    // About section
    gsap.from('.about-image-wrapper', {
        scrollTrigger: { trigger: '.about-grid', start: 'top 75%' },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
    });

    gsap.from('.about-content', {
        scrollTrigger: { trigger: '.about-grid', start: 'top 75%' },
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
    });

    // Skill cards
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%' },
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power3.out',
        });
    });

    // Animate skill rings
    const animateRings = () => {
        document.querySelectorAll('.skill-ring').forEach(ring => {
            const percent = parseInt(ring.dataset.percent);
            const circle = ring.querySelector('.ring-fill');
            if (circle) {
                const circumference = 339.292;
                const offset = circumference - (percent / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }
        });
    };

    ScrollTrigger.create({
        trigger: '.skills',
        start: 'top 70%',
        onEnter: animateRings,
        once: true,
    });

    // Timeline cards
    gsap.utils.toArray('.timeline-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 80%' },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        });
    });

    // Cert cards
    gsap.utils.toArray('.cert-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%' },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.15,
        });
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%' },
            y: 50,
            opacity: 0,
            duration: 0.7,
            delay: (i % 3) * 0.12,
            ease: 'power3.out',
        });
    });

    // Education cards
    gsap.utils.toArray('.edu-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%' },
            y: 50,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
        });
    });

    // Contact section
    gsap.from('.contact-info', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 75%' },
        x: -50,
        opacity: 0,
        duration: 0.8,
    });

    gsap.from('.contact-form', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 75%' },
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
    });

    // Parallax on hero 3D mesh based on scroll
    gsap.to(heroMesh.position, {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
        y: -15,
        z: -20,
    });
}

// ========== TYPING ANIMATION ==========
const roles = [
    'Founder & CEO of Animweb Technologies',
    'Full Stack Developer',
    '3D Modeller & Animator',
    'MERN Stack Developer',
    'Creative Technologist',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleText = document.getElementById('role-text');

function typeRole() {
    const current = roles[roleIndex];
    if (isDeleting) {
        roleText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeRole, speed);
}

setTimeout(typeRole, 2000);

// ========== NAVIGATION ==========
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.section === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Smooth scroll on nav click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ========== SKILLS TABS ==========
document.querySelectorAll('.skill-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + tab.dataset.tab).classList.add('active');

        // Re-animate skill rings in new panel
        setTimeout(() => {
            document.querySelectorAll('.skills-panel.active .skill-ring').forEach(ring => {
                const percent = parseInt(ring.dataset.percent);
                const circle = ring.querySelector('.ring-fill');
                if (circle) {
                    const circumference = 339.292;
                    circle.style.strokeDashoffset = circumference;
                    setTimeout(() => {
                        const offset = circumference - (percent / 100) * circumference;
                        circle.style.strokeDashoffset = offset;
                    }, 50);
                }
            });
        }, 50);
    });
});

// ========== PROJECT FILTER ==========
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                gsap.from(card, { opacity: 0, y: 20, duration: 0.4 });
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ========== 3D TILT EFFECT ==========
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

// ========== CONTACT FORM ==========
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #00cec9, #00b894)';
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

// ========== SVG GRADIENT FOR SKILL RINGS ==========
// Add SVG gradient definition
const svgNS = 'http://www.w3.org/2000/svg';
const defs = document.createElementNS(svgNS, 'svg');
defs.setAttribute('style', 'position:absolute;width:0;height:0');
defs.innerHTML = `
    <defs>
        <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#6c5ce7"/>
            <stop offset="100%" style="stop-color:#00cec9"/>
        </linearGradient>
    </defs>
`;
document.body.prepend(defs);

// Apply gradient to all ring-fill circles
document.querySelectorAll('.ring-fill').forEach(circle => {
    circle.setAttribute('stroke', 'url(#skillGradient)');
});

// ========== SMOOTH SCROLL FOR CTA BUTTONS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== MAGNETIC EFFECT ON BUTTONS ==========
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

console.log('%c Portfolio loaded successfully! ', 'background: linear-gradient(135deg, #6c5ce7, #00cec9); color: white; padding: 10px 20px; border-radius: 8px; font-size: 14px;');
