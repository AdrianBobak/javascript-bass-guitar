class Modal {
  constructor(selector) {
    this.el = selector;
    this.closeBtn = this.el.querySelector('.modal__close');
    this.openBtn = document.querySelector('.modal__open');

    this.initMethods();
    this.initBindings();
  }

  initMethods() {
    this.toggleModal = (e) => {
      if (this.el.classList.contains('visible')) {
        this.el.classList.remove('visible');
      } else this.el.classList.add('visible');
    }
  }

  initBindings() {
    this.closeBtn.addEventListener('click', this.toggleModal);
    this.openBtn.addEventListener('click', this.toggleModal);
  }
}

export default Modal;