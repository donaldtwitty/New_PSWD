/**
 * @jest-environment jsdom
 */

const {
    mobileNav,
    onScroll,
    handleFormSubmission,
    closePopup,
} = require('../New_PSWD/assets/js/custom-testable.js');
const {
    openDCModal,
    closeDCModal,
    handleClickOutside,
    handleEscapeKey,
} = require('../New_PSWD/assets/js/modal-testable.js');

describe('Modal Functions Coverage', () => {
    beforeEach(() => {
        document.body.innerHTML =
            '<div id="dc-modal" style="display: none;"></div>';
    });

    test('openDCModal shows modal', () => {
        openDCModal();
        const modal = document.getElementById('dc-modal');
        expect(modal.style.display).toBe('flex');
    });

    test('closeDCModal hides modal', () => {
        const modal = document.getElementById('dc-modal');
        modal.style.display = 'flex';
        closeDCModal();
        expect(modal.style.display).toBe('none');
    });

    test('handleClickOutside closes modal when clicking modal', () => {
        const modal = document.getElementById('dc-modal');
        modal.style.display = 'flex';
        const event = { target: modal };
        handleClickOutside(event);
        expect(modal.style.display).toBe('none');
    });

    test('handleClickOutside does not close modal when clicking inside', () => {
        const modal = document.getElementById('dc-modal');
        modal.style.display = 'flex';
        const event = { target: document.createElement('div') };
        handleClickOutside(event);
        expect(modal.style.display).toBe('flex');
    });

    test('handleEscapeKey closes modal when visible', () => {
        const modal = document.getElementById('dc-modal');
        modal.style.display = 'flex';
        const event = { key: 'Escape' };
        handleEscapeKey(event);
        expect(modal.style.display).toBe('none');
    });

    test('handleEscapeKey does nothing when modal hidden', () => {
        const modal = document.getElementById('dc-modal');
        modal.style.display = 'none';
        const event = { key: 'Escape' };
        handleEscapeKey(event);
        expect(modal.style.display).toBe('none');
    });

    test('handleEscapeKey ignores other keys', () => {
        const modal = document.getElementById('dc-modal');
        modal.style.display = 'flex';
        const event = { key: 'Enter' };
        handleEscapeKey(event);
        expect(modal.style.display).toBe('flex');
    });
});

describe('Custom Functions Coverage', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <form id="contact-form"></form>
      <div id="thankyou-popup" style="display: none;"></div>
      <div class="submenu"><ul></ul></div>
    `;
        global.fetch = jest.fn();
        global.alert = jest.fn();
    });

    test('mobileNav function runs with width >= 992', () => {
        global.$ = jest.fn(() => ({
            width: () => 1200,
            on: jest.fn(),
        }));
        expect(() => mobileNav()).not.toThrow();
    });

    test('mobileNav function runs with width < 992', () => {
        const mockJQuery = jest.fn((selector) => {
            if (selector === window) {
                return { width: () => 800 };
            }
            if (selector === '.submenu') {
                return {
                    on: jest.fn((event, callback) => {
                        // Mock both $('.submenu ul') and $(this) calls inside callback
                        const originalJQuery = global.$;
                        global.$ = jest.fn((innerSelector) => {
                            if (innerSelector === '.submenu ul') {
                                return { removeClass: jest.fn() };
                            }
                            return {
                                find: jest.fn(() => ({
                                    toggleClass: jest.fn(),
                                })),
                            };
                        });
                        callback.call({});
                        global.$ = originalJQuery;
                    }),
                };
            }
            return {
                removeClass: jest.fn(),
                find: jest.fn(() => ({ toggleClass: jest.fn() })),
            };
        });
        global.$ = mockJQuery;
        expect(() => mobileNav()).not.toThrow();
    });

    test('onScroll function with element in view', () => {
        const mockJQuery = jest.fn((selector) => {
            if (selector === document) {
                return { scrollTop: () => 100 };
            }
            if (selector === '.nav a') {
                return {
                    each: jest.fn((callback) => {
                        const mockThis = {
                            attr: () => '#test',
                            addClass: jest.fn(),
                            removeClass: jest.fn(),
                        };
                        const currLink = {
                            attr: () => '#test',
                            addClass: jest.fn(),
                            removeClass: jest.fn(),
                        };
                        mockJQuery.mockReturnValueOnce(currLink);
                        mockJQuery.mockReturnValueOnce({
                            position: () => ({ top: 50 }),
                            height: () => 100,
                        });
                        mockJQuery.mockReturnValueOnce({
                            removeClass: jest.fn(),
                        });
                        callback.call(mockThis);
                    }),
                };
            }
            return {
                position: () => ({ top: 50 }),
                height: () => 100,
                removeClass: jest.fn(),
            };
        });
        global.$ = mockJQuery;
        expect(() => onScroll({})).not.toThrow();
    });

    test('onScroll function with element out of view', () => {
        const mockJQuery = jest.fn((selector) => {
            if (selector === document) {
                return { scrollTop: () => 200 };
            }
            if (selector === '.nav a') {
                return {
                    each: jest.fn((callback) => {
                        const mockThis = {
                            attr: () => '#test',
                            addClass: jest.fn(),
                            removeClass: jest.fn(),
                        };
                        const currLink = {
                            attr: () => '#test',
                            addClass: jest.fn(),
                            removeClass: jest.fn(),
                        };
                        mockJQuery.mockReturnValueOnce(currLink);
                        mockJQuery.mockReturnValueOnce({
                            position: () => ({ top: 50 }),
                            height: () => 100,
                        });
                        callback.call(mockThis);
                    }),
                };
            }
            return {
                position: () => ({ top: 50 }),
                height: () => 100,
                removeClass: jest.fn(),
            };
        });
        global.$ = mockJQuery;
        expect(() => onScroll({})).not.toThrow();
    });

    test('handleFormSubmission with success', async () => {
        const form = document.getElementById('contact-form');
        const popup = document.getElementById('thankyou-popup');

        global.fetch.mockResolvedValueOnce({ ok: true });

        handleFormSubmission(form, popup);

        const event = new Event('submit');
        form.dispatchEvent(event);

        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    test('handleFormSubmission with error', async () => {
        const form = document.getElementById('contact-form');
        const popup = document.getElementById('thankyou-popup');

        global.fetch.mockResolvedValueOnce({ ok: false });

        handleFormSubmission(form, popup);

        const event = new Event('submit');
        form.dispatchEvent(event);

        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    test('handleFormSubmission with fetch error', async () => {
        const form = document.getElementById('contact-form');
        const popup = document.getElementById('thankyou-popup');

        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        handleFormSubmission(form, popup);

        const event = new Event('submit');
        form.dispatchEvent(event);

        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    test('closePopup hides popup', () => {
        const popup = document.getElementById('thankyou-popup');
        popup.style.display = 'flex';
        closePopup(popup);
        expect(popup.style.display).toBe('none');
    });

    test('closePopup handles null popup', () => {
        expect(() => closePopup(null)).not.toThrow();
    });
});
