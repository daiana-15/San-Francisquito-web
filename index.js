window.addEventListener('scroll', function () {
    const header = document.querySelector('header.navbar');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Menu Hamburguesa Móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            const isActive = navMenu.classList.toggle('nav-active');
            menuToggle.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isActive);
        });
    }

    // Intersection Observer para Animaciones de Scroll
    const animatedCards = document.querySelectorAll(".fade-in-card");

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedCards.forEach(card => observer.observe(card));
});