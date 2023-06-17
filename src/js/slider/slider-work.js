import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export default class SliderWork {
  constructor() {
    this.#swiper();
  }

  #swiper() {
    return new Swiper('.examples-work__slider', {
      // configure Swiper to use modules
      centeredSlides: true,
      init: true,
      observer: true,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.examples-work__nav--next',
        prevEl: '.examples-work__nav--prev',
      },
      mousewheel: true,
      loop: true,
    });
  }
}
