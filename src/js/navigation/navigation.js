export class Navigation {
  #menuContainerClass = 'navigation';
  #menuButtonClass = 'hamburger__button';
  #menuButton = document.querySelector(`.${this.#menuButtonClass}`);
  #menuContainer = document.querySelector(`.${this.#menuContainerClass}`);
  #closeIsOutsideClick = null;
  #isOpen = false;

  init = () => {
    this.#setHandler();
    // this.#closeIsOutsideClick = new CloseIsOutsideClick(this.#toggleNavigation, '.hamburger-element', '.navigation');
  };

  #setHandler = () => {
    this.#menuButton.addEventListener('click', this.#toggleNavigation);
  };

  #toggleNavigation = (evt) => {
    evt.preventDefault();
    this.#menuButton.classList.toggle(`${this.#menuButtonClass}--open`);
    this.#menuContainer.classList.toggle(`${this.#menuContainerClass}--open`);

    if (this.#isOpen) {
      // this.#closeIsOutsideClick.removeHandler();
      this.#isOpen = false;
      return;
    }

    // set close handler is outside click. Use one handler
    // this.#closeIsOutsideClick.setHandler();
    this.#isOpen = true;
  };
}
