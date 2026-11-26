/**
 * Contact form (contact.html)
 *
 * The site is static, so the form does not send anything by itself. On
 * submit it checks the name and email, builds a plain-text request, and
 * offers two ways to send it: open the visitor's email app, or copy the text.
 *
 * To have the form submit directly later, replace handleSubmit with a
 * request to a form service.
 */
(function () {
    'use strict';

    const CONTACT_EMAIL = 'info@purposefulsolutionswebdesign.com';
    const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

    const form = document.getElementById('lead');
    if (!form) {
        return;
    }

    const result = document.getElementById('result');
    const resultMessage = document.getElementById('result-msg');
    const resultText = document.getElementById('result-text');
    const mailLink = document.getElementById('mail-link');
    const copyButton = document.getElementById('copy-btn');
    const needSelect = document.getElementById('need');

    function fieldValue(id) {
        return document.getElementById(id).value.trim();
    }

    function setSendOptionsVisible(visible) {
        mailLink.hidden = !visible;
        copyButton.hidden = !visible;
    }

    // pricing.html links here as contact.html?package=Starter|Standard|Pro
    function preselectPackage() {
        const pkg = new URLSearchParams(window.location.search).get('package');
        if (!pkg) {
            return;
        }
        const match = Array.from(needSelect.options).find(
            (option) => option.text === `${pkg} website`
        );
        if (match) {
            needSelect.value = match.value;
        }
    }

    function buildRequest() {
        return [
            `Name: ${fieldValue('name')}`,
            `Email: ${fieldValue('email')}`,
            `Organization: ${fieldValue('org')}`,
            `Need: ${fieldValue('need')}`,
            `Current site: ${fieldValue('url') || 'none'}`,
            '',
            fieldValue('msg') || '(no details added)',
        ].join('\n');
    }

    function handleSubmit(event) {
        event.preventDefault();
        result.classList.add('is-visible');

        const name = fieldValue('name');
        const email = fieldValue('email');

        if (!name || !EMAIL_PATTERN.test(email)) {
            resultMessage.textContent = 'Add your name and a valid email address so we can reply.';
            resultText.textContent = '';
            setSendOptionsVisible(false);
            return;
        }

        const body = buildRequest();
        const subject = `${fieldValue('need')} request from ${name}`;

        resultText.textContent = body;
        mailLink.href =
            `mailto:${CONTACT_EMAIL}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;
        resultMessage.textContent =
            `Your request is ready. Send it from your email app, ` +
            `or copy it and email ${CONTACT_EMAIL}.`;
        setSendOptionsVisible(true);
    }

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(resultText.textContent);
            copyButton.textContent = 'Copied';
        } catch (error) {
            copyButton.textContent = 'Select the text above to copy';
        }
    }

    preselectPackage();
    form.addEventListener('submit', handleSubmit);
    copyButton.addEventListener('click', handleCopy);
})();
