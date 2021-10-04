import 'core-js/stable';

import possibilitiesAccordion from './modules/possibilitiesAccordion';
import headerMenu from './modules/headerMenu';
import videoFootageSlider from './modules/videoFootageSlider';

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  possibilitiesAccordion();
  headerMenu();
  videoFootageSlider();
})