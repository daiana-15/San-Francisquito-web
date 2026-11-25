window.addEventListener('scroll', function () {
    const header = document.querySelector('header.navbar');
    if (!header) return;

    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // 1. Menú Hamburguesa Móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            const isActive = navMenu.classList.toggle('nav-active');
            menuToggle.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isActive);
        });

        // Cierra el menú si se hace clic en un enlace (útil en navegación móvil)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('nav-active');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Intersection Observer para Animaciones de Scroll
    const animatedCards = document.querySelectorAll('.fade-in-card');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedCards.forEach(card => observer.observe(card));
    } else {
        animatedCards.forEach(card => card.classList.add('visible'));
    }

    // 3. Resaltado interactivo en las tarjetas de cada año (1° a 6°)
    const yearCards = document.querySelectorAll('.year-card');

    yearCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');

        const toggleSelection = () => {
            const alreadySelected = card.classList.contains('selected-year');

            yearCards.forEach(otherCard => {
                otherCard.classList.remove('selected-year');
                otherCard.setAttribute('aria-pressed', 'false');
            });

            if (!alreadySelected) {
                card.classList.add('selected-year');
                card.setAttribute('aria-pressed', 'true');
            }
        };

        card.addEventListener('click', toggleSelection);

        card.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleSelection();
            }
        });
    });
});