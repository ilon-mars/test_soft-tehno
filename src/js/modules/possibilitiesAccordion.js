const possibilitiesAccordion = () => {
  const possibilitiesList = document.querySelector('.possibilities__list');

  possibilitiesList.addEventListener('click', e => {
    const target = e.target;

    if(target.closest('.possibilities__btn')) {
      target.closest('.possibilities__item').classList.toggle('active');
    }
  })
}

export default possibilitiesAccordion;