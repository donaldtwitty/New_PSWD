/**
 * Compact menu for small screens (every page)
 *
 * Below 720px the header links fold behind a "Menu" button. The CSS only
 * hides the links when the page has the "js" class (set in each page's
 * head), so without JavaScript the links stay visible.
 */
(function () {
    'use strict';

    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('site-nav');
    if (!toggle || !nav) {
        return;
    }

    const desktopQuery = window.matchMedia('(min-width: 721px)');

    function setOpen(open) {
        toggle.setAttribute('aria-expanded', String(open));
        nav.classList.toggle('is-open', open);
    }

    function isOpen() {
        return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    // Escape closes the menu and returns focus to the button
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    // Reset when the window grows to desktop width
    desktopQuery.addEventListener('change', (event) => {
        if (event.matches) {
            setOpen(false);
        }
    });
})();
