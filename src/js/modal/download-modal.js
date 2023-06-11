import { modalManager } from '../utils/utils';

export default class DownloadModal {
  #buttonsClassName = 'download-modal';
  #modalID = 'download-project';
  init = () => {
    const buttons = document.querySelectorAll(`.${this.#buttonsClassName}`);
    const modalID = this.#modalID;
    buttons.forEach((button) => {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        modalManager.openModal(modalID);
      });
    });
    modalManager.openModal(modalID);
  };
}
