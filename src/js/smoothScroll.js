function init() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const empty = anchor.getAttribute('href');

      if (empty === '#') return;
      if (anchor === document.querySelector('li.navigation__item a[href="#info"]') || anchor === document.querySelector('li.navigation__item a[href="#contact"]') || anchor === document.querySelector('[href="#info"]') || anchor === document.querySelector('[href="#contact"]')) {
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      } else {
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

export default init;
