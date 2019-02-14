const hiddenMenu = document.querySelector('.menu-mobile');
const checkBox = document.querySelector('.hamburger__checkbox');
const menuMobileList = document.querySelectorAll('.menu-mobile li');

function init() {
  checkBox.addEventListener('change', () => {
    if (checkBox.checked === true) {
      hiddenMenu.classList.add('menu-mobile--visible');
      // document.querySelector('body').classList.add('stop-scrolling');
    } else {
      hiddenMenu.classList.remove('menu-mobile--visible');
      document.querySelector('body').classList.remove('stop-scrolling');
    }
  });

  menuMobileList.forEach(item => item.addEventListener('click', () => {
    hiddenMenu.classList.remove('menu-mobile--visible');
    checkBox.checked = false;
  }));
}
export default init;
