import 'core-js/stable';

import possibilitiesAccordion from './modules/possibilitiesAccordion';
import headerMenu from './modules/headerMenu';

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  possibilitiesAccordion();
  headerMenu();
})