// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
});

// Typed.js for typing effect in the Hero section
var options = {
    strings: ["Web Developer", "3D Modeler", "Creative Designer", "Tech Enthusiast"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
    backDelay: 1000
};

var typed = new Typed(".typed-text", options);

// Scroll animations for navigation bar background color change
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(0, 120, 255, 0.9)";
    } else {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    }
});

// Scroll to section smooth scrolling
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 80,  // Adjusted for navbar height
            behavior: "smooth"
        });
    });
});

// Custom Button Hover Effects
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseover', function () {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease-in-out';
    });

    button.addEventListener('mouseout', function () {
        this.style.transform = 'scale(1)';
    });
});

window.addEventListener('scroll', function () {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const isInViewport = barTop < window.innerHeight;

        if (isInViewport) {
            const percent = bar.getAttribute('data-percent');
            bar.querySelector('before').style.width = percent + '%';
        }
    });
});
