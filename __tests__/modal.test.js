/**
 * @jest-environment jsdom
 */

// Mock DOM elements
document.body.innerHTML = `
  <div id="dc-modal" class="js-hidden"></div>
`;

// Load and execute modal.js
const fs = require('fs');
const path = require('path');
const modalCode = fs.readFileSync(
    path.join(__dirname, '../New_PSWD/assets/js/modal.js'),
    'utf8'
);
eval(modalCode);

describe('Modal Functions', () => {
    let modal;

    beforeEach(() => {
        modal = document.getElementById('dc-modal');
        modal.classList.add('js-hidden');
    });

    test('openDCModal shows the modal', () => {
        openDCModal();
        expect(modal.classList.contains('js-hidden')).toBe(false);
    });

    test('closeDCModal hides the modal', () => {
        modal.classList.remove('js-hidden');
        closeDCModal();
        expect(modal.classList.contains('js-hidden')).toBe(true);
    });

    test('clicking outside modal closes it', () => {
        modal.classList.remove('js-hidden');
        const clickEvent = new MouseEvent('click');
        Object.defineProperty(clickEvent, 'target', { value: modal });
        window.dispatchEvent(clickEvent);
        expect(modal.classList.contains('js-hidden')).toBe(true);
    });

    test('clicking inside modal does not close it', () => {
        modal.classList.remove('js-hidden');
        const clickEvent = new MouseEvent('click');
        Object.defineProperty(clickEvent, 'target', {
            value: document.createElement('div'),
        });
        window.dispatchEvent(clickEvent);
        expect(modal.classList.contains('js-hidden')).toBe(false);
    });

    test('escape key closes modal when visible', () => {
        modal.classList.remove('js-hidden');
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        window.dispatchEvent(escapeEvent);
        expect(modal.classList.contains('js-hidden')).toBe(true);
    });

    test('escape key does nothing when modal hidden', () => {
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        window.dispatchEvent(escapeEvent);
        expect(modal.classList.contains('js-hidden')).toBe(true);
    });

    test('other keys do not close modal', () => {
        modal.classList.remove('js-hidden');
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
        window.dispatchEvent(enterEvent);
        expect(modal.classList.contains('js-hidden')).toBe(false);
    });
});
