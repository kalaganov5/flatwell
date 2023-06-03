export class CloseIsOutsideClick {
  #buttonSelector = null;
  #modalSelector = null;
  #closeCallbackFunction = null;

  constructor(callbackFunction, buttonSelector = '', modalSelector = '') {
    this.#closeCallbackFunction = callbackFunction;
    this.#buttonSelector = buttonSelector;
    this.#modalSelector = modalSelector;
  }

  setHandler = () => {
    document.addEventListener('click', this.#closeHandler, false);
  };

  removeHandler = () => {
    document.removeEventListener('click', this.#closeHandler, false);
  };

  #closeHandler = (evt) => {
    if (!evt.target.matches(this.#buttonSelector) & !evt.target.closest(this.#modalSelector)) {
      this.#closeCallbackFunction(evt);
    }
  };
}
