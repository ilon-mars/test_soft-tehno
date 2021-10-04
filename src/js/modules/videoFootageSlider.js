const videoFootageSlider = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      859: {
        slidesPerView: 2,
        spaceBetween: 40,
      }
    }
  });
}

export default videoFootageSlider;