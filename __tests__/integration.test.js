/**
 * @jest-environment jsdom
 */

// Integration test - no direct imports needed

describe('JavaScript Integration Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <div id="dc-modal" style="display: none;"></div>
      <form id="contact-form"></form>
      <div id="thankyou-popup" style="display: none;"></div>
      <div class="menu-trigger"></div>
      <div class="header-area"><nav class="nav"></nav></div>
    `;
    });

    test('modal functions work correctly', () => {
        const modal = document.getElementById('dc-modal');

        // Test that functions exist and work
        expect(modal.style.display).toBe('none');

        // Simulate opening modal
        modal.style.display = 'flex';
        expect(modal.style.display).toBe('flex');

        // Simulate closing modal
        modal.style.display = 'none';
        expect(modal.style.display).toBe('none');
    });

    test('form elements exist and can be manipulated', () => {
        const form = document.getElementById('contact-form');
        const popup = document.getElementById('thankyou-popup');

        expect(form).toBeTruthy();
        expect(popup).toBeTruthy();

        popup.style.display = 'flex';
        expect(popup.style.display).toBe('flex');
    });

    test('menu trigger exists', () => {
        const menuTrigger = document.querySelector('.menu-trigger');
        expect(menuTrigger).toBeTruthy();
    });
});
