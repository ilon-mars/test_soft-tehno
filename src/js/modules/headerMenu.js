const headerMenu = () => {
  const menuBtn = document.querySelector('.header__menu-btn');
  const menuBlock = document.querySelector('.menu__list--mobile');
  const menuBtnClose = document.querySelector('.menu__btn-close');

  menuBtn.addEventListener('click', () => {
    menuBlock.classList.add('active');
    document.body.classList.add('overlay-active');
    menuBtnClose.classList.add('active');
  })

  menuBlock.addEventListener('click', e => {
    if(e.target.closest('.menu__item--mobile')) {
      menuBlock.classList.remove('active');
      document.body.classList.remove('overlay-active');
      menuBtnClose.classList.remove('active');
    }
  })

  menuBtnClose.addEventListener('click', () => {
    menuBlock.classList.remove('active');
    document.body.classList.remove('overlay-active');
    menuBtnClose.classList.remove('active');
  })
}

export default headerMenu;