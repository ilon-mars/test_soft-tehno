import 'core-js/stable';
import 'regenerator-runtime/runtime';

import possibilitiesAccordion from './modules/possibilitiesAccordion';
import headerMenu from './modules/headerMenu';
import videoFootageSlider from './modules/videoFootageSlider';
import fetchData from './modules/fetchData';
import updatesLoader from './modules/updatesLoader';
import smoothScroll from './modules/smoothScroll';

('use strict');

document.addEventListener('DOMContentLoaded', () => {
  fetchData().then(response => {
    updatesLoader(response);
  });

  possibilitiesAccordion();
  headerMenu();
  videoFootageSlider();
  smoothScroll();
});
