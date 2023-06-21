export default class CalculateRanovationForm {
  #form = null;
  #inputSquare = null;
  #priceField = null;
  #inputRenovationPerM2 = null;
  #inputRenovationType = null;
  #inputHouseType = null;

  #inputFormSquare = null;
  #inputFormHouseType = null;
  #inputFormRenovationType = null;

  init() {
    this.#form = document.querySelector('.renovation-calc__form');

    // если это блок с формой
    if (this.#form !== null) {
      this.#inputSquare = this.#form.querySelector('#fw-square');
      this.#priceField = this.#form.querySelector('.renovation-calc__result span');
      this.#inputRenovationType = this.#form.querySelector('input[name="fw-renovation-type"]:checked');
      this.#inputHouseType = this.#form.querySelector('input[name="fw-house-type"]:checked');
      this.#inputRenovationPerM2 = this.#inputRenovationType.getAttribute('data-price');

      // input for form
      this.#inputFormSquare = this.#form.querySelector('input[name="fw-square-val"]');
      this.#inputFormHouseType = this.#form.querySelector('input[name="fw-house-type-val"]');
      this.#inputFormRenovationType = this.#form.querySelector('input[name="fw-renovation-type-val"]');
      // input for form

      this.#calculate();

      this.#setRenovationHandler();
      this.#setSquareHandler();
      this.#setHouseTypeHandler();
    }
  }

  #setRenovationHandler() {
    const tariffRadios = this.#form.querySelectorAll('input[name="fw-renovation-type"]');

    // Функция для обработки изменения значения радио-переключателя
    const handleTariffChange = (evt) => {
      this.#inputRenovationPerM2 = evt.target.getAttribute('data-price');
      this.#calculate();
    };

    // Проходимся по всем радио-переключателям и добавляем обработчик события изменения
    tariffRadios.forEach(radio => {
      radio.addEventListener('change', handleTariffChange);
    });
  }

  #setSquareHandler() {
    const inputSquare = this.#form.querySelector('input[name="fw-square"]');

    // Функция для обработки изменения значения радио-переключателя
    const handleTariffChange = (evt) => {
      this.#calculate();
    };

    // Проходимся по всем радио-переключателям и добавляем обработчик события изменения
    inputSquare.addEventListener('input', handleTariffChange);
  }

  #setHouseTypeHandler() {
    const houseRadios = this.#form.querySelectorAll('input[name="fw-house-type"]');

    // Функция для обработки изменения значения радио-переключателя
    const handleTariffChange = (evt) => {
      console.log(this.#inputHouseType);
      this.#inputHouseType = evt.target;
      this.#updateValueForm();
    };

    // Проходимся по всем радио-переключателям и добавляем обработчик события изменения
    houseRadios.forEach(radio => {
      radio.addEventListener('change', handleTariffChange);
    });
  }

  #calculate() {
    this.#updateValueForm();
    return this.#priceField.textContent = (this.#inputRenovationPerM2 * this.#inputSquare.value).toLocaleString('ru-RU');
  }

  #updateValueForm() {
    this.#inputRenovationType = this.#form.querySelector('input[name="fw-renovation-type"]:checked');

    this.#inputFormSquare.value = this.#inputSquare.value;
    this.#inputFormHouseType.value = this.#inputHouseType.value;
    this.#inputFormRenovationType.value = `${this.#inputRenovationType.value} – ${this.#inputRenovationType.getAttribute('data-price')} за м²`;
  }
}
