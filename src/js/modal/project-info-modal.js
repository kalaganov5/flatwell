import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { formatValue, modalManager } from '../utils/utils';

export default class ProjectInfoModal {
  #buttonsClassName = 'modal-project-info';
  #modalID = 'modal-project';
  #projectID = null;
  #homeUrl = window.wpJSON;

  init() {
    const buttons = document.querySelectorAll(`.${this.#buttonsClassName}`);
    const modalID = this.#modalID;
    buttons.forEach((button) => {
      button.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.#projectID = button.getAttribute('data-id');
        this.getData(this.#projectID)
          .then(() => {
            modalManager.openModal(modalID, {
              disableFocus: true,
              disableScroll: true,
              onClose: this.#closeModal,
            });
            this.#swiper();
          })
          .catch(error => {
            alert('Что пошло не так. Ошибка ' + error);
          });
      });
    });
  }

  #closeModal() {
    // tmp
  }

  #swiper() {
    return new Swiper('.project__slider', {
      // configure Swiper to use modules
      init: true,
      observer: true,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.project__button--next',
        prevEl: '.project__button--prev',
      },
      pagination: {
        el: '.project__pagination',
        clickable: true,
      },
      mousewheel: true,
      spaceBetween: 55,
      loop: true,
    });
  }

  #updateData({
    areaValue,
    priceValue,
    durationValue,
    contentValue,
    images
  }) {
    const modal = document.querySelector('#modal-project');

    // Обновление значений
    if (areaValue) {
      const area = modal.querySelector('.project__area span');
      area.textContent = areaValue;
    }

    if (priceValue) {
      const price = modal.querySelector('.project__cost span');
      const formatter = new Intl.NumberFormat('ru-RU');
      price.textContent = formatValue(priceValue);
    }

    if (durationValue) {
      const duration = modal.querySelector('.project__date');
      duration.textContent = durationValue;
    }

    if (contentValue) {
      const content = modal.querySelector('.project__data');
      content.innerHTML = contentValue;
    }

    // Обновление содержимого блока "swiper-wrapper"
    if (images) {
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      swiperWrapper.innerHTML = images.map(image => `
      <div class="project__slide swiper-slide">
        <img alt="${image.alt}" height="333" src="${image.link}" width="270">
      </div>
    `)
        .join('');
    }
  }

  getData(postId) {

    const postMetaPromise = fetch(this.#homeUrl + `custom/v1/meta/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при получении метаданных поста');
        }
        return response.json();
      })
      .catch(error => {
        // Обработка ошибки получения метаданных поста
        throw error; // Переброс ошибки для обработки во внешнем коде
      });

    return Promise.all([postMetaPromise])
      .then(([postMetaData]) => {

        const {
          area,
          cost,
          duration,
          gallery,
          description
        } = postMetaData;
        this.#updateData({
          areaValue: area,
          priceValue: cost,
          durationValue: duration,
          contentValue: description,
          images: gallery,
        });
      });
  }
}
