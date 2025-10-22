// Enhanced analytics and error tracking
(function() {
    'use strict';

    // Performance monitoring
    function trackPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    gtag('event', 'page_load_time', {
                        value: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                        custom_parameter: 'load_time_ms'
                    });
                }, 0);
            });
        }
    }

    // Error tracking
    function trackErrors() {
        window.addEventListener('error', function(e) {
            gtag('event', 'exception', {
                description: e.message,
                fatal: false
            });
        });
    }

    // User engagement tracking
    function trackEngagement() {
        let scrollDepth = 0;
        window.addEventListener('scroll', function() {
            const depth = Math.round((window.scrollY / document.body.scrollHeight) * 100);
            if (depth > scrollDepth && depth % 25 === 0) {
                scrollDepth = depth;
                gtag('event', 'scroll_depth', { value: depth });
            }
        });
    }

    // Initialize tracking
    trackPerformance();
    trackErrors();
    trackEngagement();
})();