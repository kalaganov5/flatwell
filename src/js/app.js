import 'normalize.css';

/* Your JS Code goes here */
// DEV
// eslint-disable-next-line import/no-extraneous-dependencies
import loadPixelperfect from 'pixelperfect-tool';
import '../scss/app.scss';
import { animation } from './animation/animation';
import { phoneValidation } from './phone-validation/phone-validation';

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
