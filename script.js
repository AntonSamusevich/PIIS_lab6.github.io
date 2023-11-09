document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');

  let activeElement = null; // Активный элемент
  let offsetX, offsetY; // Смещение относительно курсора
  let startPosition = null; // Исходная позиция элемента
  let pressStartTime = 0; // Время начала удержания пальца

  targets.forEach(target => {

    // Обработчик события касания начала
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      pressStartTime = currentTime;

      if (currentTime - pressStartTime > 1000) {
        activeElement = target;
        startPosition = {
          left: activeElement.style.left,
          top: activeElement.style.top,
        };
        const touch = e.touches[0];
        offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
        offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
        e.preventDefault();
      } 
    });

    // Обработчик события движения при касании
    document.addEventListener('touchmove', (e) => {
      if (activeElement) {
        const touch = e.touches[0];
        activeElement.style.left = touch.clientX - offsetX + 'px';
        activeElement.style.top = touch.clientY - offsetY + 'px';
        e.preventDefault();
      }
    });

    // Обработчик события завершения касания
    document.addEventListener('touchend', (e) => {
      activeElement = null; // Сбрасываем активный элемент
    });
  });
});
