import { modalManager } from '../utils/utils';

export default class FreeConsultModal {
  #buttonsClassName = 'modal-free-consult';
  #modalID = 'free-consult';
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
