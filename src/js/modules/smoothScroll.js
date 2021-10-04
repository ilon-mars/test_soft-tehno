const smoothScroll = () => {
  const DURATION = 500;

  const scrollAnimation = ({ timing, draw, duration }) => {
    let start = performance.now();

    requestAnimationFrame(function scrollAnimation(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      let progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    });
  };

  const scrolled = e => {
    const target = e.target;

    if (target.closest('[href^="#"]')) {
      e.preventDefault();


      const elemTopCoordinate = document
        .querySelector(target.closest('[href^="#"]').getAttribute('href'))
        .getBoundingClientRect().top;

      scrollAnimation({
        duration: DURATION,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          window.scrollTo(
            0,
            elemTopCoordinate > 0 ? elemTopCoordinate * progress : -1 * elemTopCoordinate * (1 - progress)
          );
        },
      });
    }
  };

  document.body.addEventListener('click', scrolled);
};

export default smoothScroll;
