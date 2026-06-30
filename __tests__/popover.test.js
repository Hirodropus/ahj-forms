/**
 * @jest-environment jsdom
 */

import Popover from '../src/Popover';

describe('Popover widget', () => {
  let trigger;
  let popover;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="test-btn">Toggle</button>
    `;
    trigger = document.getElementById('test-btn');
    popover = new Popover(trigger, {
      title: 'Test Title',
      content: 'Test Content',
    });
  });

  test('popover is hidden initially', () => {
    expect(document.querySelector('.popover-wrapper')).toBeNull();
    expect(popover.isShown).toBe(false);
  });

  test('click toggles popover visibility', () => {
    // Первый клик – показываем
    trigger.click();
    const wrapper = document.querySelector('.popover-wrapper');
    expect(wrapper).not.toBeNull();
    expect(wrapper.classList.contains('show')).toBe(true);
    expect(popover.isShown).toBe(true);

    // Проверяем содержимое
    const header = wrapper.querySelector('.popover-header');
    const body = wrapper.querySelector('.popover-body');
    expect(header.textContent).toBe('Test Title');
    expect(body.textContent).toBe('Test Content');

    // Второй клик – скрываем
    trigger.click();
    expect(document.querySelector('.popover-wrapper')).toBeNull();
    expect(popover.isShown).toBe(false);
  });

  test('popover is positioned correctly', () => {
    // Мокаем getBoundingClientRect для триггера
    const triggerRect = {
      top: 100,
      left: 200,
      width: 80,
      height: 40,
    };
    trigger.getBoundingClientRect = jest.fn(() => triggerRect);

    // Мокаем getBoundingClientRect для wrapper после вставки
    const wrapperRect = {
      width: 276,
      height: 150,
    };

    trigger.click();
    const wrapper = document.querySelector('.popover-wrapper');
    wrapper.getBoundingClientRect = jest.fn(() => wrapperRect);

    // Вызываем позиционирование вручную (оно вызывается в show, но нам нужен точный расчёт)
    popover.position();

    const expectedTop = triggerRect.top - wrapperRect.height - 12 + window.scrollY;
    const expectedLeft = triggerRect.left + (triggerRect.width / 2) - (wrapperRect.width / 2) + window.scrollX;

    expect(wrapper.style.top).toBe(`${expectedTop}px`);
    expect(wrapper.style.left).toBe(`${expectedLeft}px`);
  });
});