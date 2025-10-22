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

    // Rate limiting for form submissions
    let lastSubmission = 0;
    const RATE_LIMIT = 5000; // 5 seconds

    function isRateLimited() {
        const now = Date.now();
        if (now - lastSubmission < RATE_LIMIT) {
            return true;
        }
        lastSubmission = now;
        return false;
    }

    // Export functions
    window.PSWD_Security = {
        sanitizeInput,
        isRateLimited
    };
})();