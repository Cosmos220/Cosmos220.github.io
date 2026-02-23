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
        }, 300);
        document.body.style.overflow = 'auto';
    }
}

function closeModalOnOutside(event) {
    if (event.target.id === 'cvModal') {
        closeModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
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

    const navLinks = document.querySelectorAll('.nav-links a');
    const marker = document.querySelector('.nav-marker');
    const navLinksContainer = document.querySelector('.nav-links');

    if (marker && navLinksContainer) {
        function moveMarker(e) {
            const link = e.target;
            marker.style.opacity = '1';
            marker.style.left = link.offsetLeft + 'px';
            marker.style.width = link.offsetWidth + 'px';
        }
        function hideMarker() { marker.style.opacity = '0'; }

        navLinks.forEach(link => link.addEventListener('mouseenter', moveMarker));
        navLinksContainer.addEventListener('mouseleave', hideMarker);
    }

    const navBar = document.getElementById('main-nav');
    if (navBar) {
        navBar.addEventListener('mousemove', (e) => {
            const rect = navBar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            navBar.style.setProperty('--mouse-x', `${x}px`);
            navBar.style.setProperty('--mouse-y', `${y}px`);
        });
    }

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
});