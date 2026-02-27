document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Basic mobile menu toggle (Will expand on this later)
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // --- Navbar Background on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(9, 9, 11, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(9, 9, 11, 0.7)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Staggered Scroll Reveals ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    let delayCounter = 0;
    let delayTimeout;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply a dynamic transition delay to stagger the animations
                entry.target.style.transitionDelay = `${delayCounter * 100}ms`;
                entry.target.classList.add('show');
                observer.unobserve(entry.target);

                delayCounter++;

                // Reset the counter after a short delay so the next scroll batch starts at 0
                clearTimeout(delayTimeout);
                delayTimeout = setTimeout(() => {
                    delayCounter = 0;
                }, 100);
            }
        });
    }, observerOptions);

    // Grab everything we want to fade in
    const hiddenElements = document.querySelectorAll('.bento-card, .product-card, .section-title, .section-desc, .form-container');

    // Add the hidden class to them initially via JS so if JS fails, they are still visible
    hiddenElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
