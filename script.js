document.addEventListener('DOMContentLoaded', function() {
    // ================ Preloader Animation ================
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Add fade-out class to preloader
            setTimeout(() => {
                preloader.classList.add('fade-out');
                
                // Remove preloader from DOM after animation completes
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 500);
        }
        
        // Update progress bar and text
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.floor(progress)}%`;
    }, 100);
    
    // ================ Header Scroll Effect ================
    const header = document.querySelector('.header');
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Initial check
    updateHeader();
    
    // Update on scroll
    window.addEventListener('scroll', updateHeader);
    
    // ================ Mobile Navigation ================
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // ================ Theme Toggle ================
    const themeSwitch = document.getElementById('theme-switch');
    const themeLabel = document.querySelector('.theme-label');
    const mobileThemeLabel = document.querySelector('.mobile-theme-label');
    
    // Check for saved theme preference or use preferred color scheme
    function checkTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            themeSwitch.checked = true;
        }
    }
    
    // Initialize theme
    checkTheme();
    
    // Theme switch event
    function toggleTheme() {
        if (themeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }
    
    themeSwitch.addEventListener('change', toggleTheme);
    
    // Sync both theme toggles
    themeLabel.addEventListener('click', function() {
        themeSwitch.checked = !themeSwitch.checked;
        toggleTheme();
    });
    
    mobileThemeLabel.addEventListener('click', function() {
        themeSwitch.checked = !themeSwitch.checked;
        toggleTheme();
    });
    
    // ================ Smooth Scrolling ================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================ Active Link Highlighting ================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial check
    updateActiveLink();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // ================ Initialize AOS Animations ================
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // ================ Typewriter Effect ================
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ["Full Stack Developer", "MERN Stack Specialist", "Web Designer", "Tech Enthusiast"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay + 500);
        }
    }
    
    // Start typing effect on page load
    if (textArray.length) {
        setTimeout(type, newTextDelay);
    }
    
    // ================ Counter Animation ================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(counter);
                    current = target;
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // ================ Theme Change Effects ================
    const themeSwitch = document.getElementById('theme-switch');
    
    function updateHeroTheme() {
        const hero = document.querySelector('.hero');
        if (themeSwitch.checked) {
            hero.classList.add('dark-mode');
        } else {
            hero.classList.remove('dark-mode');
        }
    }
    
    // Initial theme check
    updateHeroTheme();
    
    // Update on theme change
    themeSwitch.addEventListener('change', updateHeroTheme);
    
    // ================ Scroll Down Button ================
    const scrollDown = document.querySelector('.scroll-down');
    
    scrollDown.addEventListener('click', function() {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
    
    // ================ Intersection Observer for Animations ================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    
                    // Add animation class to tech badges
                    const techBadges = document.querySelectorAll('.tech-badge');
                    techBadges.forEach((badge, index) => {
                        setTimeout(() => {
                            badge.classList.add('animated');
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroSection);
    }
    
    // ================ Image Hover Effect ================
    const profileImg = document.querySelector('.profile-img');
    const imageFrame = document.querySelector('.image-frame');
    
    if (imageFrame && profileImg) {
        imageFrame.addEventListener('mousemove', (e) => {
            const x = e.clientX - imageFrame.getBoundingClientRect().left;
            const y = e.clientY - imageFrame.getBoundingClientRect().top;
            
            const centerX = imageFrame.offsetWidth / 2;
            const centerY = imageFrame.offsetHeight / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            profileImg.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
        });
        
        imageFrame.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
});

// about me //
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll) library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // Smooth scroll for Hire Me button
    const hireMeButton = document.querySelector('.btn-hire');
    hireMeButton.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Progress bar animation on scroll
    const progressBars = document.querySelectorAll('.progress-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
});

//education section//
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll) library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // Animate progress meters on scroll
    const meterFills = document.querySelectorAll('.meter-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const percent = fill.getAttribute('data-percent');
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = `${percent}%`;
                }, 100);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    meterFills.forEach(fill => observer.observe(fill));

    // Interactive timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Parallax effect for background particles
    window.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.bg-particle');
        particles.forEach(particle => {
            const speed = parseFloat(particle.style.animationDuration) || 10;
            const x = (e.clientX * speed) / 250;
            const y = (e.clientY * speed) / 250;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});

//skills section //

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll) library
    AOS.init({
        duration: 1200,
        once: true,
        offset: 120,
    });

    // Animate skill progress bars on scroll
    const skillProgress = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const percent = progress.getAttribute('data-percent');
                progress.style.width = '0%';
                setTimeout(() => {
                    progress.style.width = `${percent}%`;
                }, 100);
                observer.unobserve(progress);
            }
        });
    }, { threshold: 0.6 });

    skillProgress.forEach(progress => observer.observe(progress));

    // Interactive skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            skillItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            // Trigger a subtle scale animation on click
            item.style.transform = 'scale(1.1)';
            setTimeout(() => {
                item.style.transform = 'scale(1.05)';
            }, 200);
        });
    });

    // Parallax effect for background particles with mouse movement
    window.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.bg-particle');
        particles.forEach(particle => {
            const speed = parseFloat(particle.style.animationDuration) || 8;
            const x = (e.clientX * speed) / 200;
            const y = (e.clientY * speed) / 200;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Dynamic badge animation on scroll
    const badge = document.querySelector('.skills-badge');
    const badgeObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            badge.classList.add('animate');
            setTimeout(() => {
                badge.classList.remove('animate');
            }, 1000);
        }
    }, { threshold: 0.3 });
    badgeObserver.observe(badge);
});

//project section//
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll) library
    AOS.init({
        duration: 1200,
        once: true,
        offset: 120,
    });

    // Animate project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('active');
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('active');
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for background particles
    window.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.bg-particle');
        particles.forEach(particle => {
            const speed = parseFloat(particle.style.animationDuration) || 8;
            const x = (e.clientX * speed) / 200;
            const y = (e.clientY * speed) / 200;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Dynamic badge animation on scroll
    const badge = document.querySelector('.projects-badge');
    const badgeObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            badge.classList.add('animate');
            setTimeout(() => {
                badge.classList.remove('animate');
            }, 1000);
        }
    }, { threshold: 0.3 });
    badgeObserver.observe(badge);
});

//certificaate section//
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll) library
    AOS.init({
        duration: 1200,
        once: true,
        offset: 120,
    });

    // Parallax effect for background particles
    window.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.bg-particle');
        particles.forEach(particle => {
            const speed = parseFloat(particle.style.animationDuration) || 8;
            const x = (e.clientX * speed) / 200;
            const y = (e.clientY * speed) / 200;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Dynamic badge animation on scroll
    const badge = document.querySelector('.certificate-badge');
    const badgeObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            badge.classList.add('animate');
            setTimeout(() => {
                badge.classList.remove('animate');
            }, 1000);
        }
    }, { threshold: 0.3 });
    badgeObserver.observe(badge);

    // Certificate modal handling
    const modal = document.querySelector('#certificate-modal');
    const modalTitle = document.querySelector('#modal-title');
    const modalIssuer = document.querySelector('#modal-issuer');
    const modalDate = document.querySelector('#modal-date');
    const modalDescription = document.querySelector('#modal-description');
    const modalLink = document.querySelector('#modal-link');
    const viewCertButtons = document.querySelectorAll('.view-cert-btn');
    const modalClose = document.querySelector('.modal-close');

    const certificateData = {
        'meta-frontend': {
            title: 'Meta Front-End Developer',
            issuer: 'Coursera by Meta',
            date: 'Completed: May 7, 2024',
            description: 'Mastered front-end development skills including HTML, CSS, JavaScript, React, and UI/UX design principles through Meta\'s comprehensive program.',
            link: 'https://coursera.org/verify/professional-cert/AQX6CA6XJDKW',
        },
        'Game Design: Art and Concepts': {
            title: 'Game Design: Art and Concepts',
            issuer: 'Course by Cal Arts on Coursera',
            date: 'Completed: Apr 1, 2024',
            description: 'Gained advanced proficiency in Game design thinking, logic building.',
            link: 'https://coursera.org/verify/specialization/DGN3KNCVUYTS',
        },

    };

    viewCertButtons.forEach(button => {
        button.addEventListener('click', () => {
            const certId = button.getAttribute('data-cert-id');
            const cert = certificateData[certId];
            
            modalTitle.textContent = cert.title;
            modalIssuer.textContent = cert.issuer;
            modalDate.textContent = cert.date;
            modalDescription.textContent = cert.description;
            modalLink.setAttribute('href', cert.link);
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

//contact section//
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll) library
    AOS.init({
        duration: 1200,
        once: true,
        offset: 120,
    });

    // Parallax effect for background particles
    window.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.bg-particle');
        particles.forEach(particle => {
            const speed = parseFloat(particle.style.animationDuration) || 8;
            const x = (e.clientX * speed) / 200;
            const y = (e.clientY * speed) / 200;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Dynamic badge animation on scroll
    const badge = document.querySelector('.contact-badge');
    const badgeObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            badge.classList.add('animate');
            setTimeout(() => {
                badge.classList.remove('animate');
            }, 1000);
        }
    }, { threshold: 0.3 });
    badgeObserver.observe(badge);

    // Form submission handling for Netlify
    const form = document.querySelector('form[name="contact-form"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset();
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error!';
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.disabled = false;
            }, 2000);
        }
    });
});

//footer//
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll) library
    AOS.init({
        duration: 1200,
        once: true,
        offset: 120,
    });

    // Parallax effect for background particles
    window.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.bg-particle');
        particles.forEach(particle => {
            const speed = parseFloat(particle.style.animationDuration) || 8;
            const x = (e.clientX * speed) / 200;
            const y = (e.clientY * speed) / 200;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Dynamic badge animation on scroll
    const badge = document.querySelector('.footer-badge');
    const badgeObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            badge.classList.add('animate');
            setTimeout(() => {
                badge.classList.remove('animate');
            }, 1000);
        }
    }, { threshold: 0.3 });
    badgeObserver.observe(badge);
    // Form submission handling for Contact Form
    const contactForm = document.querySelector('form[name="footer-contact-form"]');
    const contactSubmitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const formData = new FormData(contactForm);
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                contactForm.reset();
                contactSubmitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                setTimeout(() => {
                    contactPopup.classList.remove('active');
                    document.body.style.overflow = '';
                    contactSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    contactSubmitBtn.disabled = false;
                }, 2000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            contactSubmitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error!';
            setTimeout(() => {
                contactSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                contactSubmitBtn.disabled = false;
            }, 2000);
        }
    });
});