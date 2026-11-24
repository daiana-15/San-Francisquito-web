document.addEventListener("DOMContentLoaded", () => {
    // 1. Cambio de estilo en la barra de navegación al hacer scroll
    const header = document.querySelector('header.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Comprobación inicial

    // 2. Desplegable del menú hamburguesa en móviles
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navMenu.classList.toggle('nav-active');
            menuToggle.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isActive);
        });

        // Cierra el menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-active');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Cierra el menú al hacer clic fuera de él
        document.addEventListener('click', (event) => {
            if (!header.contains(event.target) && navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Cierra el menú presionado la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 3. Animación de revelado al hacer scroll (Intersection Observer)
    const cards = document.querySelectorAll(".fade-in-card");

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Detiene la observación una vez mostrada
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
});