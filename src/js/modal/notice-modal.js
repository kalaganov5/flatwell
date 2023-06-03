import { modalManager } from '../utils/utils';

export default class NoticeModal {
  #modalID = 'modal-message';
  success = () => {
    modalManager.openModal(this.#modalID);
  };
}
