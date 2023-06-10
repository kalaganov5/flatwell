import { modalManager } from '../utils/utils';

export default class CalculateModal {
  #buttonsClassName = 'modal-calculate-form';
  #modalID = 'modal-calculate';
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
