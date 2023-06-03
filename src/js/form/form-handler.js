import { NoticeModal } from '../modal/notice-modal';

export class FormHandler {
  init() {
    if (this.#formValidation) {
      // показ успеха при отправке формы
      this.#formSuccess();
    } else {
      // показ ошибки валидации формы
      this.#formError();
    }
  }

  #formValidation() {
    console.log('validation');
    // валидации формы
    return true;
  }

  #formSuccess() {
    console.log('form success');
    // уведомление об успешной отправке формы
    new NoticeModal().init();
  }

  #formError() {
    console.log('form ошибка');
    // сделать вывод и показ ошибки при ошибке
  }
}
