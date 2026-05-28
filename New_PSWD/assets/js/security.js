// Security enhancements
(function() {
    'use strict';

    // Content Security Policy reporting
    if ('securitypolicyviolation' in document) {
        document.addEventListener('securitypolicyviolation', function(e) {
            // Report CSP violations to analytics instead of console
            if (typeof gtag !== 'undefined') {
                gtag('event', 'csp_violation', {
                    violated_directive: e.violatedDirective
                });
            }
        });
    }

    // Form validation and sanitization
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    // Rate limiting for form submissions (persists across page refreshes via sessionStorage)
    const RATE_LIMIT = 10000; // 10 seconds

    function isRateLimited() {
        const now = Date.now();
        const last = parseInt(sessionStorage.getItem('pswd_last_submit') || '0', 10);
        if (now - last < RATE_LIMIT) {
            return true;
        }
        sessionStorage.setItem('pswd_last_submit', now.toString());
        return false;
    }

    // Export functions
    window.PSWD_Security = {
        sanitizeInput,
        isRateLimited
    };
})();