import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import wNumb from 'wnumb';

const formatForSlider = {
  from: function (formattedValue) {
    return Number(formattedValue);
  },
  to: function (numericValue) {
    return Math.round(numericValue);
  },
};

export default class FormCalculate {
  #priceField = null;
  #pricePerM2 = null;
  #slider = null;

  init() {
    this.#slider = document.getElementById('calculate-form__range');
    const valueElement = document.getElementById('calculate-form__value');
    this.#priceField = document.querySelector('.calculate-form__value span');

    noUiSlider.create(this.#slider, {
      start: [100],
      connect: true,
      range: {
        min: 3,
        max: 500,
      },
      tooltips: [
        wNumb({
          postfix: ' м&sup2;',
          decimals: 0,
        }),
      ],
      step: 1,
      format: formatForSlider,
      behaviour: 'drag',
      click: true,
      pips: {
        mode: 'values',
        density: 10,
        stepped: true,
        values: [1, 500],
        cssPrefix: 'calculate-form-',
        format: {
          to: function (value) {
            return value + ' м&sup2;';
          },
          from: function (value) {
            return value.replace(' м&sup2;', '');
          },
        },
      },
    });

    this.#slider.noUiSlider.on('update', (values, handle) => {
      const sliderValue = values[handle];
      this.setCost(sliderValue);
      this.#setDataForm(sliderValue);
    });

    this.getTariff();
  }

  getTariff() {
    // Получаем все радио-переключатели с именем "select-tariff"
    const tariffRadios = document.querySelectorAll('input[name="select-tariff"]');

    // Функция для обработки изменения значения радио-переключателя
    const handleTariffChange = (evt) => {
      // Получаем выбранное значение
      this.#pricePerM2 = evt.target.getAttribute('data-price');
      this.setCost(this.#slider.noUiSlider.get());
      this.#setDataForm(null, null, `Тариф: ${evt.target.value}, Цена м²: ${evt.target.getAttribute('data-price')}`);
    };

    // Проходимся по всем радио-переключателям и добавляем обработчик события изменения
    tariffRadios.forEach(radio => {
      radio.addEventListener('change', handleTariffChange);
    });

  }

  setCost(sliderValue) {
    if (!this.#pricePerM2) {
      const checkedRadio = document.querySelector('input[name="select-tariff"]:checked');
      this.#pricePerM2 = checkedRadio.getAttribute('data-price');
      this.#setDataForm(null, null, `Тариф: ${checkedRadio.value}, Цена м²: ${checkedRadio.getAttribute('data-price')}`);
    }
    const cost = (sliderValue * this.#pricePerM2).toLocaleString('ru-RU');
    this.#setDataForm(null, cost);
    this.#priceField.textContent = cost;
  }

  #setDataForm(area = null, cost = null, tariff = null) {
    // Получение элементов формы
    const areaInputElement = document.querySelector('#calculate-form-area');
    const costInputElement = document.querySelector('#calculate-form-cost');
    const tariffInputElement = document.querySelector('#calculate-form-tariff');

    // Функция для установки значения свойства, если оно отличается
    function setPropertyValue(inputElement, newValue) {
      if (inputElement.value !== newValue) {
        inputElement.value = newValue;
      }
    }

    // Установка значений свойств
    if (area !== null) {
      setPropertyValue(areaInputElement, area);
    }
    if (cost !== null) {
      setPropertyValue(costInputElement, cost);
    }
    if (tariff !== null) {
      setPropertyValue(tariffInputElement, tariff);
    }
  }

}
