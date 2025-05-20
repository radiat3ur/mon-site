document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  const arrowDown = document.querySelector('.arrow-down');
  const arrowUp = document.querySelector('.arrow-up');

  function isMobile() {
    return window.matchMedia('(max-width: 900px)').matches || window.innerHeight > window.innerWidth;
  }

  function closeMenu() {
    navUl.classList.remove('menu-open');
    arrowDown.style.display = '';
    arrowUp.style.display = 'none';
  }

  function openMenu() {
    navUl.classList.add('menu-open');
    arrowDown.style.display = 'none';
    arrowUp.style.display = '';
  }

  // Ne rien faire si le bouton n'est pas visible (desktop)
  menuToggle.addEventListener('click', function() {
    if (!isMobile()) return;
    if (navUl.classList.contains('menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fermer le menu si on repasse en desktop
  window.addEventListener('resize', function() {
    if (!isMobile()) {
      navUl.classList.remove('menu-open');
      arrowDown.style.display = '';
      arrowUp.style.display = 'none';
    }
  });

  // Optionnel : fermer le menu quand on clique sur un lien
  navUl.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (isMobile()) closeMenu();
    });
  });
});
