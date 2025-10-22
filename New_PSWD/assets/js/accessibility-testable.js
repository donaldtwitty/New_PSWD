// Testable version of accessibility.js
function initMobileMenuA11y() {
    const menuTrigger = document.querySelector('.menu-trigger');
    const nav = document.querySelector('.nav');

    if (menuTrigger && nav) {
        menuTrigger.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);

            if (!isExpanded) {
                const firstMenuItem = nav.querySelector('a');
                if (firstMenuItem) {
                    setTimeout(() => firstMenuItem.focus(), 100);
                }
            }
        });
    }
}

function initDarkModeA11y() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            const isPressed = this.getAttribute('aria-pressed') === 'true';
            this.setAttribute('aria-pressed', !isPressed);

            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = isPressed
                ? 'Light mode activated'
                : 'Dark mode activated';
            document.body.appendChild(announcement);

            setTimeout(() => {
                if (document.body.contains(announcement)) {
                    document.body.removeChild(announcement);
                }
            }, 1000);
        });
    }
}

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

function initPreloaderA11y() {
    const preloader = document.getElementById('preloader');

    if (preloader) {
        preloader.setAttribute('aria-label', 'Loading content, please wait');
        preloader.setAttribute('role', 'status');

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
        return observer;
    }
}

function initAccessibility() {
    initMobileMenuA11y();
    initDarkModeA11y();
    initSmoothScrollA11y();
    initPreloaderA11y();
}

module.exports = {
    initMobileMenuA11y,
    initDarkModeA11y,
    initSmoothScrollA11y,
    initPreloaderA11y,
    initAccessibility,
};
