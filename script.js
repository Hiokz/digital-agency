document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Basic mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = document.querySelectorAll('.nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
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
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Custom Animated Dropdowns ---
    const customSelectSources = document.querySelectorAll('.custom-select-source');

    customSelectSources.forEach(select => {
        // Hide the original select
        select.classList.add('hidden-select');

        // Create the custom wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-container';
        // Insert wrapper right before the select, then move select into it
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);

        // Create the trigger div (the visible "button")
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';

        // Find the currently selected option to show its text
        let selectedOption = select.options[select.selectedIndex];
        let placeholderText = "Select an option";
        if (selectedOption) {
            placeholderText = selectedOption.text;
        }

        trigger.innerHTML = `
            <span class="trigger-text">${placeholderText}</span>
            <i class="fas fa-chevron-down arrow-icon"></i>
        `;
        wrapper.appendChild(trigger);

        // Create the options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'custom-options-container';
        wrapper.appendChild(optionsContainer);

        // Create an option div for each non-disabled option in the original select
        Array.from(select.options).forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'custom-option';
            optionDiv.textContent = option.text;
            optionDiv.dataset.value = option.value;

            // If it's a disabled/placeholder option, style and hide it
            if (option.disabled && option.value === "") {
                optionDiv.classList.add('is-placeholder');
            }

            // Click event for the option
            optionDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                // Update the trigger text
                trigger.querySelector('.trigger-text').textContent = optionDiv.textContent;

                // Update the native select value
                select.value = optionDiv.dataset.value;

                // Remove selected class from all and add to this
                optionsContainer.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
                optionDiv.classList.add('selected');

                // Close the dropdown
                wrapper.classList.remove('open');
            });

            optionsContainer.appendChild(optionDiv);
        });

        // Toggle dropdown open/close on trigger click
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close any other open dropdowns first
            document.querySelectorAll('.custom-select-container').forEach(container => {
                if (container !== wrapper) {
                    container.classList.remove('open');
                }
            });
            wrapper.classList.toggle('open');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-container').forEach(container => {
            container.classList.remove('open');
        });
    });

});
