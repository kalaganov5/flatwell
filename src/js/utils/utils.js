import MicroModal from 'micromodal';

class ModalManager {
  #currentOpenModalID = null;

  openModal(modalID, config = {
    disableScroll: true,
  }) {
    if (this.#currentOpenModalID) {
      MicroModal.close(this.#currentOpenModalID);
    }

    MicroModal.show(modalID, config);
    this.#currentOpenModalID = modalID;
  }

  closeModal(modalID) {
    if (this.#currentOpenModalID === modalID) {
      MicroModal.close(modalID);
      this.#currentOpenModalID = null;
    }
  }
}

export const modalManager = new ModalManager();

export const formatValue = (number, options = {}) => {
  const locales = 'ru-RU';
  const formatter = new Intl.NumberFormat(locales, options);

  return formatter.format(number);
};
