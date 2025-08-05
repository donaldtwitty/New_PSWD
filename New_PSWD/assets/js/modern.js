document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Mobile navigation
    function mobileNav() {
        const width = window.innerWidth;
        const submenu = document.querySelectorAll('.submenu');
        submenu.forEach(item => {
            item.addEventListener('click', function() {
                if (width < 992) {
                    document.querySelectorAll('.submenu ul').forEach(ul => ul.classList.remove('active'));
                    this.querySelector('ul')?.classList.toggle('active');
                }
            });
        });
    }

    // Menu toggle
    const menuTrigger = document.querySelector('.menu-trigger');
    if (menuTrigger) {
        menuTrigger.addEventListener('click', function() {
            this.classList.toggle('active');
            const nav = document.querySelector('.header-area .nav');
            nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (window.innerWidth < 991) {
                    menuTrigger?.classList.remove('active');
                    document.querySelector('.header-area .nav').style.display = 'none';
                }
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Update active nav
                document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Scroll spy for navigation
    function onScroll() {
        const scrollPos = window.pageYOffset;
        document.querySelectorAll('.nav a').forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const top = section.offsetTop - 130;
                const bottom = top + section.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.visibility = 'hidden';
                preloader.style.display = 'none';
            }, 600);
        }
    });

    // Contact form
    const form = document.getElementById('contact-form');
    const popup = document.getElementById('thankyou-popup');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            try {
                const response = await fetch('https://formspree.io/f/xzzrnyzr', {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' }
                });
                if (response.ok) {
                    popup.style.display = 'flex';
                    form.reset();
                } else {
                    alert('There was a problem submitting the form. Please try again later.');
                }
            } catch (error) {
                alert('There was a problem submitting the form. Please try again later.');
            }
        });
    }

    window.closePopup = function() {
        popup.style.display = 'none';
    };

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (darkModeToggle) {
        darkModeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fa fa-sun-o"></i>' : '<i class="fa fa-moon-o"></i>';
        darkModeToggle.addEventListener('click', function() {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.innerHTML = newTheme === 'dark' ? '<i class="fa fa-sun-o"></i>' : '<i class="fa fa-moon-o"></i>';
        });
    }

    // Initialize
    mobileNav();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', mobileNav);
});