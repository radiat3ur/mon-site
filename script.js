document.addEventListener('DOMContentLoaded', function () {
    const boutonMenu = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    const flecheBas = document.querySelector('.fleche-bas');
    const flecheHaut = document.querySelector('.fleche-haut');

    function estMobile() {
        return window.matchMedia('(max-width: 900px)').matches || window.innerHeight > window.innerWidth;
    }

    function fermerMenu() {
        navUl.classList.remove('menu-open');
        flecheBas.style.display = '';
        flecheHaut.style.display = 'none';
    }

    function ouvrirMenu() {
        navUl.classList.add('menu-open');
        flecheBas.style.display = 'none';
        flecheHaut.style.display = '';
    }

    boutonMenu.addEventListener('click', function () {
        if (!estMobile()) return;
        if (navUl.classList.contains('menu-open')) {
            fermerMenu();
        } else {
            ouvrirMenu();
        }
    });

    window.addEventListener('resize', function () {
        if (!estMobile()) {
            navUl.classList.remove('menu-open');
            flecheBas.style.display = '';
            flecheHaut.style.display = 'none';
        }
    });

    navUl.querySelectorAll('a').forEach(function (lien) {
        lien.addEventListener('click', function () {
            if (estMobile()) fermerMenu();
        });
    });

    const boutonsFiltre = document.querySelectorAll('.boutonFiltre');

    boutonsFiltre.forEach(bouton => {
        bouton.addEventListener('click', function () {
            bouton.classList.toggle('active');
            mettreAJourVisibiliteChronologie();
        });
    });

    function mettreAJourVisibiliteChronologie() {
        const typesActifs = Array.from(boutonsFiltre)
        .filter(b => b.classList.contains('active'))
        .map(b => b.getAttribute('data-type'));

        document.querySelectorAll('.element').forEach(el => {
            const icone = el.querySelector('.icone');
            if (!icone) return;
            const types = Array.from(icone.classList).filter(cls =>
                ['projet', 'pro', 'asso', 'etudes', 'diplome'].includes(cls)
            );
            const show = types.some(t => typesActifs.includes(t));
            el.style.display = show ? '' : 'none';
        });
    }

    mettreAJourVisibiliteChronologie();

    async function envoyerEmail(form) {
        try {
            await emailjs.sendForm('service_9saorv4', 'template_63a7f0u', form);
            document.getElementById('message-verification').textContent = 'Message sent successfully!';
            setTimeout(() => {
                document.getElementById('message-verification').textContent = '';
            }, 4000);
        } catch (error) {
            console.error('Échec de l\'envoi', error);
        }
    }

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            envoyerEmail(this);
            this.reset();
        });
    }
});
