import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { formatValue, modalManager } from '../utils/utils';

export default class ProjectInfoModal {
  #buttonsClassName = 'modal-project-info';
  #modalID = 'modal-project';

  #projectID = null;
  #slider = null;

  #homeUrl = 'http://localhost:8000/';

  #isError = false;

  constructor(projectId) {

  }

  init() {
    // вызов swiper

    const buttons = document.querySelectorAll(`.${this.#buttonsClassName}`);
    const modalID = this.#modalID;
    buttons.forEach((button) => {
      button.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.#projectID = button.getAttribute('data-id');
        this.#getData(this.#projectID);

        if (!this.#isError) {
          modalManager.openModal(modalID, {
            disableFocus: true,
            disableScroll: true,
            onClose: this.#closeModal,
          });
          this.#swiper();
          // this.#slider.init();
        }
      });
    });
  }

  #closeModal() {
    console.log('close modsl');
    // this.#slider.destroy();
  }

  #swiper() {
    this.#slider = new Swiper('.project__slider', {
      // configure Swiper to use modules
      init: true,
      observer: true,
      observeParents: true,
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

  async #getData(postId) {
    try {
      const postContentResponse = await fetch(this.#homeUrl + `wp-json/wp/v2/cases/${postId}`);
      // if (!postContentResponse.ok) {
      //   throw new Error('Ошибка получения содержимого поста');
      // }
      const postContentData = await postContentResponse.json();
      this.#updateData({ contentValue: postContentData.content.rendered });

      const postMetaResponse = await fetch(this.#homeUrl + `wp-json/custom/v1/meta/${postId}`);
      // if (!postMetaResponse.ok) {
      //   throw new Error('Ошибка получения метаданных поста');
      // }
      const postMetaData = await postMetaResponse.json();

      const {
        area,
        cost,
        duration,
        gallery
      } = postMetaData;
      this.#updateData({
        areaValue: area,
        priceValue: cost,
        durationValue: duration,
        images: gallery,
      });
    } catch (error) {
      this.#isError = true;
      alert('К сожалению, возникли технические неполадки, которые повлияли на нормальную работу данной страницы. Пожалуйста, выполните обновление страницы, чтобы попытаться решить проблему. В случае сохранения проблемы, мы рекомендуем связаться с нашей службой поддержки, чтобы получить необходимую помощь. Мы приносим извинения за доставленные неудобства и приложим все усилия, чтобы как можно скорее восстановить нормальное функционирование.\n\nС уважением,\nКоманда поддержки.');
    }
  }
}
