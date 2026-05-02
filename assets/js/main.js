
function openModal() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); r
        document.body.style.overflow = 'auto';
    }
}

function closeModalOnOutside(event) {
    if (event.target.id === 'cvModal') {
        closeModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialisation des étoiles
    function initStars() {
        let sets = [['.stars', 700], ['.stars2', 200], ['.stars3', 100]];
        sets.forEach(([sel, cnt]) => {
            let el = document.querySelector(sel);
            if (el) {
                let shadow = [];
                for (let i = 0; i < cnt; i++) {
                    shadow.push(`${Math.floor(Math.random() * window.innerWidth)}px ${Math.floor(Math.random() * 2000)}px #FFF`);
                }
                el.style.setProperty('--space-layer', shadow.join(', '));
            }
        });
    }
    initStars();
    window.addEventListener('resize', initStars);

    // 2. Navigation : Effet Spotlight de la souris
    const navBar = document.getElementById('main-nav');
    if (navBar) {
        let ticking = false;
        navBar.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = navBar.getBoundingClientRect();
                    navBar.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    navBar.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // 3. Navigation : Marqueur fluide et ScrollSpy (Lien actif)
    const navLinks = document.querySelectorAll('.nav-links a');
    const marker = document.querySelector('.nav-marker');
    const navLinksContainer = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section[id]');

    // Fonction pour déplacer le marqueur sur un lien spécifique
    function moveMarker(link) {
        if (!marker || !link) return;
        marker.style.opacity = '1';
        marker.style.left = link.offsetLeft + 'px';
        marker.style.width = link.offsetWidth + 'px';
    }

    // Fonction pour remettre le marqueur sur la section actuelle au repos
    function snapToActive() {
        const activeLink = document.querySelector('.nav-links a.active');
        if (activeLink) {
            moveMarker(activeLink);
        } else if (marker) {
            marker.style.opacity = '0';
        }
    }

    if (marker && navLinksContainer) {
        // Au survol, le marqueur suit la souris
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => moveMarker(e.target));
        });
        // Quand on quitte le menu, le marqueur retourne sur le lien actif
        navLinksContainer.addEventListener('mouseleave', snapToActive);
    }

    // SCROLLSPY : Détecte quelle section est au milieu de l'écran
    const scrollSpyOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // La section est "active" quand elle croise le milieu de l'écran
        threshold: 0
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                        // Si la souris n'est pas sur le menu, on bouge le marqueur
                        if (navLinksContainer && !navLinksContainer.matches(':hover')) {
                            moveMarker(link);
                        }
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => scrollSpyObserver.observe(section));

    // 4. Défilement fluide au clic sur les liens de la navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== "#") {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            }
        });
    });

    // 5. Animations d'apparition fluides au scroll (.reveal)
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Force l'animation de la section Hero dès le chargement
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('active'));
    }, 100);
});

const yearsOfExperience = new Date().getFullYear();
document.getElementById('footer-text').textContent = `© ${yearsOfExperience} DAVI Loïck - Tous droits réservés`;
