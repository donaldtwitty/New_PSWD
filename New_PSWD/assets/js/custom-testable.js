// Testable version of custom.js functions
function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function () {
        if (width < 992) {
            $('.submenu ul').removeClass('active');
            $(this).find('ul').toggleClass('active');
        }
    });
}

function onScroll() {
    var scrollPos = $(document).scrollTop();
    $('.nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        if (
            refElement.position().top <= scrollPos &&
            refElement.position().top + refElement.height() > scrollPos
        ) {
            $('.nav ul li a').removeClass('active');
            currLink.addClass('active');
        } else {
            currLink.removeClass('active');
        }
    });
}

function handleFormSubmission(form, popup) {
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const endpoint = 'https://formspree.io/f/xzzrnyzr';

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    popup.style.display = 'flex';
                    form.reset();
                } else {
                    alert(
                        'There was a problem submitting the form. Please try again later.'
                    );
                }
            } catch (error) {
                alert(
                    'There was a problem submitting the form. Please try again later.'
                );
            }
        });
    }
}

function closePopup(popup) {
    if (popup) {
        popup.style.display = 'none';
    }
}

module.exports = {
    mobileNav,
    onScroll,
    handleFormSubmission,
    closePopup,
};
