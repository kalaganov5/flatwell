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
