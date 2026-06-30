export default class Popover {
  /**
   * @param {HTMLElement} trigger - элемент, по клику на который показывается popover
   * @param {Object} options - { title, content }
   */
  constructor(trigger, options) {
    this.trigger = trigger;
    this.title = options.title || 'Popover title';
    this.content = options.content || 'And here\'s some amazing content. It\'s very engaging. Right?';
    this.isShown = false;
    this.wrapper = null;

    this.trigger.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    this.isShown ? this.hide() : this.show();
  }

  show() {
    if (this.isShown) return;
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'popover-wrapper show';

    const arrow = document.createElement('div');
    arrow.className = 'arrow';
    this.wrapper.appendChild(arrow);

    const header = document.createElement('div');
    header.className = 'popover-header';
    header.textContent = this.title;
    this.wrapper.appendChild(header);

    const body = document.createElement('div');
    body.className = 'popover-body';
    body.textContent = this.content;
    this.wrapper.appendChild(body);

    document.body.appendChild(this.wrapper);

    // Позиционирование
    this.position();

    this.isShown = true;
  }

  hide() {
    if (!this.isShown || !this.wrapper) return;
    this.wrapper.remove();
    this.wrapper = null;
    this.isShown = false;
  }

  position() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const wrapperRect = this.wrapper.getBoundingClientRect();

    const top = triggerRect.top - wrapperRect.height - 12;
    const left = triggerRect.left + (triggerRect.width / 2) - (wrapperRect.width / 2);

    this.wrapper.style.top = `${top + window.scrollY}px`;
    this.wrapper.style.left = `${left + window.scrollX}px`;
  }
}