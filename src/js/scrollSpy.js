function functionScroll() {
  const section = document.querySelectorAll('[data-scroll]');

  const sections = {};
  let i = 0;

  [...section].forEach((e) => {
    sections[e.id] = e.offsetTop;
  });

  for (i in sections) {
    if (sections[i] <= window.pageYOffset + 150) {
      document.querySelector('.navigation__link--active').classList.remove('navigation__link--active');
      document.querySelector(`li.navigation__item a[href*="${i}"]`).classList.add('navigation__link--active');
    }
  }
}

function functionScrollMobile() {
  const section = document.querySelectorAll('[data-scroll]');

  const sections = {};
  let i = 0;
  [...section].forEach((e) => {
    sections[e.id] = e.offsetTop;
  });

  for (i in sections) {
    if (sections[i] <= window.pageYOffset + 150) {
      document.querySelector('.menu-mobile__link--active2').classList.remove('menu-mobile__link--active2');
      document.querySelector(`li.menu-mobile__item a[href*="${i}"]`).classList.add('menu-mobile__link--active2');
    }
  }
}

function init() {
  window.addEventListener('scroll', () => {
    functionScroll();
    functionScrollMobile();
  });

  window.addEventListener('resize', () => {
    functionScroll();
    functionScrollMobile();
  });
}


export default init;
