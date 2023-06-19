import 'normalize.css';

import loadPixelperfect from 'pixelperfect-tool';

/* Your JS Code goes here */
// DEV
// eslint-disable-next-line import/no-extraneous-dependencies
import '../scss/app.scss';
import { animation } from './animation/animation';
import FormCalculate from './form/calculate-range';
import CalculateRanovationForm from './form/calculate-ranovation-form';
import CalculateModal from './modal/calculate-modal';
import DownloadModal from './modal/download-modal';
import FreeConsultModal from './modal/free-consult-modal';
import OfferModal from './modal/get-offer';
import NoticeModal from './modal/notice-modal';
import ProjectInfoModal from './modal/project-info-modal';
import { Navigation } from './navigation/navigation';
import { phoneValidation } from './phone-validation/phone-validation';
import SliderWork from './slider/slider-work';

window.pixelperfect = {
  breakpoints: [320, 768, 1400],
  folder: 'http://ydpn.ru/flatwell/pp/',
};

loadPixelperfect();
// DEV

animation();
phoneValidation();
// accordion
const items = document.querySelectorAll('.accordion button');

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');

  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }

  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));

new Navigation().init();

new FreeConsultModal().init();

new CalculateModal().init();

const global = window || global;
global.Notice = new NoticeModal();

new FormCalculate().init();

new ProjectInfoModal().init();

new DownloadModal().init();
new OfferModal().init();

new SliderWork();

new CalculateRanovationForm().init();
