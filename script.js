document.addEventListener('DOMContentLoaded', function() {
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

  boutonMenu.addEventListener('click', function() {
    if (!estMobile()) return;
    if (navUl.classList.contains('menu-open')) {
      fermerMenu();
    } else {
      ouvrirMenu();
    }
  });

  window.addEventListener('resize', function() {
    if (!estMobile()) {
      navUl.classList.remove('menu-open');
      flecheBas.style.display = '';
      flecheHaut.style.display = 'none';
    }
  });

  navUl.querySelectorAll('a').forEach(function(lien) {
    lien.addEventListener('click', function() {
      if (estMobile()) fermerMenu();
    });
  });

  const boutonsFiltre = document.querySelectorAll('.boutonFiltre');
  boutonsFiltre.forEach(bouton => {
    bouton.addEventListener('click', function() {
      bouton.classList.toggle('active');
      mettreAJourVisibiliteChronologie();
    });
  });

  function mettreAJourVisibiliteChronologie() {
    const typesActifs = Array.from(boutonsFiltre)
      .filter(bouton => bouton.classList.contains('active'))
      .map(bouton => bouton.getAttribute('data-type'));
    document.querySelectorAll('.element').forEach(element => {
      const icone = element.querySelector('.icone');
      if (!icone) return;
      const types = Array.from(icone.classList).filter(cls => ['projet','pro','asso','etude', 'diplome'].includes(cls));
      const afficher = types.some(type => typesActifs.includes(type));
      element.style.display = afficher ? '' : 'none';
    });
  }

  mettreAJourVisibiliteChronologie();
});