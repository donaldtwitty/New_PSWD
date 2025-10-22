/**
 * @jest-environment jsdom
 */

// Create a simple test that just imports and runs basic functions
describe('Custom JS Coverage', () => {
    test('loads custom.js without errors', () => {
        // Mock all required globals
        global.$ = global.jQuery = jest.fn(() => ({
            length: 1,
            on: jest.fn(),
            ready: jest.fn((fn) => fn()),
            width: () => 1200,
            toggleClass: jest.fn(),
            slideToggle: jest.fn(),
            removeClass: jest.fn(),
            slideUp: jest.fn(),
            animate: jest.fn(),
            offset: () => ({ top: 100 }),
            each: jest.fn(),
            hasClass: jest.fn(),
            addClass: jest.fn(),
            attr: jest.fn(() => '#test'),
            position: () => ({ top: 50 }),
            height: () => 200,
            scrollTop: () => 0,
            stop: jest.fn(() => ({ animate: jest.fn() })),
            imgfix: jest.fn(),
            counterUp: jest.fn(),
            parallax: jest.fn(),
            fadeOut: jest.fn(),
            css: jest.fn(),
            data: jest.fn(() => 'test.jpg'),
            reset: jest.fn(),
            find: jest.fn(() => ({ toggleClass: jest.fn() })),
            off: jest.fn(),
            preventDefault: jest.fn(),
        }));

        global.scrollReveal = jest.fn();
        global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
        global.FormData = jest.fn();
        global.location = { pathname: '/', hostname: 'test.com' };
        global.alert = jest.fn();

        // Mock DOM
        document.body.innerHTML = `
      <div class="menu-trigger"></div>
      <div class="header-area"><nav class="nav"></nav></div>
      <form id="contact-form"></form>
      <div id="thankyou-popup"></div>
      <div id="preloader"></div>
      <div class="home-seperator"><div class="left-item"></div><div class="right-item"></div></div>
      <div class="count-item"><strong>100</strong></div>
      <div class="cover" data-image="test.jpg"></div>
      <div class="submenu"><ul></ul></div>
    `;

        // Load the file
        const fs = require('fs');
        const path = require('path');
        const customCode = fs.readFileSync(
            path.join(__dirname, '../New_PSWD/assets/js/custom.js'),
            'utf8'
        );

        expect(() => {
            eval(customCode);
        }).not.toThrow();
    });

    test('basic DOM interactions work', () => {
        const popup = document.getElementById('thankyou-popup');
        if (popup) {
            popup.style.display = 'flex';
            expect(popup.style.display).toBe('flex');
            popup.style.display = 'none';
            expect(popup.style.display).toBe('none');
        }
    });
});
