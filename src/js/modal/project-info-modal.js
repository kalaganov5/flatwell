import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { modalManager } from '../utils/utils';

export default class ProjectInfoModal {
  #buttonsClassName = 'modal-project-info';
  #modalID = 'modal-project';
  #slider = null;

  constructor(projectId) {

  }

  init() {
    const buttons = document.querySelectorAll(`.${this.#buttonsClassName}`);
    const modalID = this.#modalID;
    buttons.forEach((button) => {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        modalManager.openModal(modalID);
      });
    });
    modalManager.openModal(modalID, {
      disableFocus: true,
      disableScroll: true,
    });

    this.#slider = new Swiper('.project__slider', {
      // configure Swiper to use modules
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
}
