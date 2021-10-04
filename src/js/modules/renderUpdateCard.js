const renderUpdateCard = (cardObject) => {
  const updatesList = document.querySelector('.updates__list');
  const updateCard = `
  <li class="updates__item">
    <span class="updates__date title">${cardObject.date}</span>
    <p class="updates__description">${cardObject.description}</p>
  </li>
  `

  updatesList.insertAdjacentHTML('beforeend', updateCard);
}

export default renderUpdateCard;