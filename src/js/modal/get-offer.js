import { modalManager } from '../utils/utils';

export default class OfferModal {
  #buttonsClassName = 'get-offer-modal';
  #modalID = 'get-offer';
  init = () => {
    const buttons = document.querySelectorAll(`.${this.#buttonsClassName}`);
    const modalID = this.#modalID;
    buttons.forEach((button) => {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        modalManager.openModal(modalID);
      });
    });
  };
}
