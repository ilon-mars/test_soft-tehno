import renderUpdateCard from './renderUpdateCard';

const updatesLoader = updatesArray => {
  const UPDATES_TO_SHOW = 4;
  let updatesLoaded = 0;

  const loadMoreBtn = document.getElementById('load-more');

  for (let i = 0; 
    i < (updatesArray.length < UPDATES_TO_SHOW ? updatesArray.length : UPDATES_TO_SHOW);
    i++) {
    renderUpdateCard(updatesArray[i]);
    updatesLoaded++;
  }

  loadMoreBtn.addEventListener('click', () => {
      for (let i = 0; 
        i < (updatesArray.length - updatesLoaded < UPDATES_TO_SHOW ? updatesArray.length - updatesLoaded : UPDATES_TO_SHOW); 
        i++) {
        renderUpdateCard(updatesArray[i + updatesLoaded]);
        updatesLoaded++;

        if(updatesLoaded === updatesArray.length) {
          loadMoreBtn.style.display = 'none';
        }
    }
  });
};

export default updatesLoader;
