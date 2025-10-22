// Accessibility enhancements
(function () {
    'use strict';

    // Focus management for mobile menu
    function initMobileMenuA11y() {
        const menuTrigger = document.querySelector('.menu-trigger');
        const nav = document.querySelector('.nav');

        if (menuTrigger && nav) {
            menuTrigger.addEventListener('click', function () {
                const isExpanded =
                    this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);

                if (!isExpanded) {
                    // Focus first menu item when opened
                    const firstMenuItem = nav.querySelector('a');
                    if (firstMenuItem) {
                        setTimeout(() => firstMenuItem.focus(), 100);
                    }
                }
            });
        }
    }

    // Dark mode toggle accessibility
    function initDarkModeA11y() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');

        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function () {
                const isPressed = this.getAttribute('aria-pressed') === 'true';
                this.setAttribute('aria-pressed', !isPressed);

                // Announce change to screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.className = 'sr-only';
                announcement.textContent = isPressed
                    ? 'Light mode activated'
                    : 'Dark mode activated';
                document.body.appendChild(announcement);

                setTimeout(() => document.body.removeChild(announcement), 1000);
            });
        }
    }

    // Keyboard navigation for smooth scroll links
    function initSmoothScrollA11y() {
        const scrollLinks = document.querySelectorAll('a[href^="#"]');

        scrollLinks.forEach((link) => {
            link.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const target = document.querySelector(
                        this.getAttribute('href')
                    );
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        target.focus();
                    }
                }
            });
        });
    }

    // Preloader accessibility
    function initPreloaderA11y() {
        const preloader = document.getElementById('preloader');

        if (preloader) {
            // Add aria-label for screen readers
            preloader.setAttribute(
                'aria-label',
                'Loading content, please wait'
            );
            preloader.setAttribute('role', 'status');

            // Remove from accessibility tree when hidden
            const observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (
                        mutation.type === 'attributes' &&
                        mutation.attributeName === 'style'
                    ) {
                        const isHidden =
                            preloader.style.visibility === 'hidden' ||
                            preloader.style.display === 'none';
                        preloader.setAttribute('aria-hidden', isHidden);
                    }
                });
            });

            observer.observe(preloader, { attributes: true });
        }
    }

    // Initialize all accessibility features
    document.addEventListener('DOMContentLoaded', function () {
        initMobileMenuA11y();
        initDarkModeA11y();
        initSmoothScrollA11y();
        initPreloaderA11y();
    });
})();
