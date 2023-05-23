import ScrollReveal from 'scrollreveal';

export const animation = () => {
  /*
  case
   */
  ScrollReveal()
    .reveal('.container:not(.header__container)', {
      duration: 1000,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      distance: '100px',
      viewFactor: 0,
    });
};
