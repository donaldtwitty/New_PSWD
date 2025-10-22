/**
 * @jest-environment jsdom
 */

// Mock DOM elements
document.body.innerHTML = `
  <div id="dc-modal" style="display: none;"></div>
`;

// Load and execute modal.js
const fs = require('fs');
const path = require('path');
const modalCode = fs.readFileSync(path.join(__dirname, '../New_PSWD/assets/js/modal.js'), 'utf8');
eval(modalCode);

describe('Modal Functions', () => {
  let modal;

  beforeEach(() => {
    modal = document.getElementById('dc-modal');
    modal.style.display = 'none';
  });

  test('openDCModal shows the modal', () => {
    openDCModal();
    expect(modal.style.display).toBe('flex');
  });

  test('closeDCModal hides the modal', () => {
    modal.style.display = 'flex';
    closeDCModal();
    expect(modal.style.display).toBe('none');
  });

  test('clicking outside modal closes it', () => {
    modal.style.display = 'flex';
    const clickEvent = new MouseEvent('click');
    Object.defineProperty(clickEvent, 'target', { value: modal });
    window.dispatchEvent(clickEvent);
    expect(modal.style.display).toBe('none');
  });

  test('clicking inside modal does not close it', () => {
    modal.style.display = 'flex';
    const clickEvent = new MouseEvent('click');
    Object.defineProperty(clickEvent, 'target', { value: document.createElement('div') });
    window.dispatchEvent(clickEvent);
    expect(modal.style.display).toBe('flex');
  });

  test('escape key closes modal when visible', () => {
    modal.style.display = 'flex';
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent);
    expect(modal.style.display).toBe('none');
  });

  test('escape key does nothing when modal hidden', () => {
    modal.style.display = 'none';
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent);
    expect(modal.style.display).toBe('none');
  });

  test('other keys do not close modal', () => {
    modal.style.display = 'flex';
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    window.dispatchEvent(enterEvent);
    expect(modal.style.display).toBe('flex');
  });
});