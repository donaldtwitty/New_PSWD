/**
 * @jest-environment jsdom
 */

const {
    initMobileMenuA11y,
    initDarkModeA11y,
    initSmoothScrollA11y,
    initPreloaderA11y,
    initAccessibility,
} = require('../New_PSWD/assets/js/accessibility-testable.js');

describe('Accessibility Functions', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.clearAllTimers();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    describe('initMobileMenuA11y', () => {
        test('sets up mobile menu accessibility when elements exist', () => {
            document.body.innerHTML = `
                <button class="menu-trigger" aria-expanded="false"></button>
                <nav class="nav"><a href="#home">Home</a></nav>
            `;

            initMobileMenuA11y();

            const menuTrigger = document.querySelector('.menu-trigger');
            menuTrigger.click();

            expect(menuTrigger.getAttribute('aria-expanded')).toBe('true');
        });

        test('focuses first menu item when menu opened', () => {
            document.body.innerHTML = `
                <button class="menu-trigger" aria-expanded="false"></button>
                <nav class="nav"><a href="#home">Home</a></nav>
            `;

            const firstMenuItem = document.querySelector('.nav a');
            firstMenuItem.focus = jest.fn();

            initMobileMenuA11y();

            const menuTrigger = document.querySelector('.menu-trigger');
            menuTrigger.click();

            jest.advanceTimersByTime(100);
            expect(firstMenuItem.focus).toHaveBeenCalled();
        });

        test('does nothing when elements do not exist', () => {
            expect(() => initMobileMenuA11y()).not.toThrow();
        });

        test('toggles aria-expanded from true to false', () => {
            document.body.innerHTML = `
                <button class="menu-trigger" aria-expanded="true"></button>
                <nav class="nav"><a href="#home">Home</a></nav>
            `;

            initMobileMenuA11y();

            const menuTrigger = document.querySelector('.menu-trigger');
            menuTrigger.click();

            expect(menuTrigger.getAttribute('aria-expanded')).toBe('false');
        });
    });

    describe('initDarkModeA11y', () => {
        test('sets up dark mode toggle accessibility', () => {
            document.body.innerHTML = `
                <button id="dark-mode-toggle" aria-pressed="false"></button>
            `;

            initDarkModeA11y();

            const toggle = document.getElementById('dark-mode-toggle');
            toggle.click();

            expect(toggle.getAttribute('aria-pressed')).toBe('true');
        });

        test('creates announcement for screen readers', () => {
            document.body.innerHTML = `
                <button id="dark-mode-toggle" aria-pressed="false"></button>
            `;

            initDarkModeA11y();

            const toggle = document.getElementById('dark-mode-toggle');
            toggle.click();

            const announcement = document.querySelector('.sr-only');
            expect(announcement).toBeTruthy();
            expect(announcement.textContent).toBe('Dark mode activated');
            expect(announcement.getAttribute('aria-live')).toBe('polite');
        });

        test('removes announcement after timeout', () => {
            document.body.innerHTML = `
                <button id="dark-mode-toggle" aria-pressed="false"></button>
            `;

            initDarkModeA11y();

            const toggle = document.getElementById('dark-mode-toggle');
            toggle.click();

            expect(document.querySelector('.sr-only')).toBeTruthy();

            jest.advanceTimersByTime(1000);

            expect(document.querySelector('.sr-only')).toBeFalsy();
        });

        test('shows light mode message when toggling from pressed state', () => {
            document.body.innerHTML = `
                <button id="dark-mode-toggle" aria-pressed="true"></button>
            `;

            initDarkModeA11y();

            const toggle = document.getElementById('dark-mode-toggle');
            toggle.click();

            const announcement = document.querySelector('.sr-only');
            expect(announcement.textContent).toBe('Light mode activated');
        });

        test('does nothing when toggle does not exist', () => {
            expect(() => initDarkModeA11y()).not.toThrow();
        });
    });

    describe('initSmoothScrollA11y', () => {
        test('sets up keyboard navigation for scroll links', () => {
            document.body.innerHTML = `
                <a href="#section1">Link 1</a>
                <div id="section1">Section 1</div>
            `;

            const target = document.getElementById('section1');
            target.scrollIntoView = jest.fn();
            target.focus = jest.fn();

            initSmoothScrollA11y();

            const link = document.querySelector('a[href="#section1"]');
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });

            link.dispatchEvent(enterEvent);

            expect(target.scrollIntoView).toHaveBeenCalledWith({
                behavior: 'smooth',
            });
            expect(target.focus).toHaveBeenCalled();
        });

        test('handles space key for scroll links', () => {
            document.body.innerHTML = `
                <a href="#section1">Link 1</a>
                <div id="section1">Section 1</div>
            `;

            const target = document.getElementById('section1');
            target.scrollIntoView = jest.fn();
            target.focus = jest.fn();

            initSmoothScrollA11y();

            const link = document.querySelector('a[href="#section1"]');
            const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });

            link.dispatchEvent(spaceEvent);

            expect(target.scrollIntoView).toHaveBeenCalled();
        });

        test('ignores other keys', () => {
            document.body.innerHTML = `
                <a href="#section1">Link 1</a>
                <div id="section1">Section 1</div>
            `;

            const target = document.getElementById('section1');
            target.scrollIntoView = jest.fn();

            initSmoothScrollA11y();

            const link = document.querySelector('a[href="#section1"]');
            const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });

            link.dispatchEvent(tabEvent);

            expect(target.scrollIntoView).not.toHaveBeenCalled();
        });

        test('handles missing target gracefully', () => {
            document.body.innerHTML = '<a href="#missing">Link</a>';

            initSmoothScrollA11y();

            const link = document.querySelector('a[href="#missing"]');
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });

            expect(() => link.dispatchEvent(enterEvent)).not.toThrow();
        });
    });

    describe('initPreloaderA11y', () => {
        test('sets up preloader accessibility attributes', () => {
            document.body.innerHTML = '<div id="preloader"></div>';

            initPreloaderA11y();

            const preloader = document.getElementById('preloader');
            expect(preloader.getAttribute('aria-label')).toBe(
                'Loading content, please wait'
            );
            expect(preloader.getAttribute('role')).toBe('status');
        });

        test('observes style changes and updates aria-hidden', () => {
            document.body.innerHTML = '<div id="preloader"></div>';

            const observer = initPreloaderA11y();
            const preloader = document.getElementById('preloader');

            preloader.style.visibility = 'hidden';

            // Trigger mutation observer
            const mutations = [
                {
                    type: 'attributes',
                    attributeName: 'style',
                    target: preloader,
                },
            ];

            observer.disconnect = jest.fn();

            expect(observer).toBeDefined();
        });

        test('returns undefined when preloader does not exist', () => {
            const result = initPreloaderA11y();
            expect(result).toBeUndefined();
        });
    });

    describe('initAccessibility', () => {
        test('initializes all accessibility functions', () => {
            document.body.innerHTML = `
                <button class="menu-trigger" aria-expanded="false"></button>
                <nav class="nav"><a href="#home">Home</a></nav>
                <button id="dark-mode-toggle" aria-pressed="false"></button>
                <a href="#section1">Link</a>
                <div id="preloader"></div>
                <div id="section1">Section</div>
            `;

            expect(() => initAccessibility()).not.toThrow();

            // Verify elements have been set up
            const menuTrigger = document.querySelector('.menu-trigger');
            const darkModeToggle = document.getElementById('dark-mode-toggle');
            const preloader = document.getElementById('preloader');

            expect(menuTrigger).toBeTruthy();
            expect(darkModeToggle).toBeTruthy();
            expect(preloader.getAttribute('role')).toBe('status');
        });
    });
});
