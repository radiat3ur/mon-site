(function() {
  const header = document.querySelector('header');
  let lastScroll = window.scroll;
  let ticking = false;
  let isMobile = () => window.matchMedia('(max-width: 100%)').matches;

  function onScroll() {
    if (!isMobile()) {
      header.classList.remove('header--hidden');
      return;
    }
    if (window.scroll > lastScroll && window.scroll > 50) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
    lastScroll= window.scroll;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  window.addEventListener('resize', function() {
    if (!isMobile()) {
      header.classList.remove('header--hidden');
    }
  });
})();
