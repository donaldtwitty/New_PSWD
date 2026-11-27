/**
 * Contact form (contact.html)
 *
 * With a form service configured (the form has data-endpoint), the request is
 * sent straight to the inbox and the visitor sees a confirmation.
 *
 * Without one, or if sending fails, the form builds the request as text and
 * offers two ways to send it: open the visitor's email app, or copy the text.
 */
(function () {
    'use strict';

    const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

    const form = document.getElementById('lead');
    if (!form) {
        return;
    }

    const endpoint = form.dataset.endpoint;
    const contactEmail = form.dataset.contactEmail;
    const submitButton = form.querySelector('button[type="submit"]');
    const result = document.getElementById('result');
    const resultMessage = document.getElementById('result-msg');
    const resultText = document.getElementById('result-text');
    const mailLink = document.getElementById('mail-link');
    const copyButton = document.getElementById('copy-btn');
    const needSelect = document.getElementById('need');

    function fieldValue(id) {
        return document.getElementById(id).value.trim();
    }

    function showResult(message, { requestText = '', sendOptions = false } = {}) {
        result.classList.add('is-visible');
        resultMessage.textContent = message;
        resultText.textContent = requestText;
        resultText.hidden = !requestText;
        mailLink.hidden = !sendOptions;
        copyButton.hidden = !sendOptions;
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

    // Fallback: hand the visitor a ready-made email
    function offerEmailDraft(intro) {
        const body = buildRequest();
        const subject = `${fieldValue('need')} request from ${fieldValue('name')}`;
        mailLink.href =
            `mailto:${contactEmail}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;
        showResult(`${intro} Send it from your email app, or copy it and email ${contactEmail}.`, {
            requestText: body,
            sendOptions: true,
        });
    }

    async function sendToInbox() {
        const payload = Object.fromEntries(new FormData(form));
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.success === false) {
            throw new Error(data.message || `Form service returned ${response.status}`);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!fieldValue('name') || !EMAIL_PATTERN.test(fieldValue('email'))) {
            showResult('Add your name and a valid email address so I can reply.');
            return;
        }

        if (!endpoint) {
            offerEmailDraft('Your request is ready.');
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
        try {
            await sendToInbox();
            showResult(
                `Thanks, ${fieldValue('name')}. Your request was sent, and I'll be in touch soon.`
            );
            form.reset();
            preselectPackage();
        } catch (error) {
            offerEmailDraft("Sorry, the form couldn't send your request.");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send my request';
        }
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
