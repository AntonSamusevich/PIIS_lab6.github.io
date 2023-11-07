document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; // Активный элемент
  let offsetX, offsetY; // Смещение относительно курсора
  let startPosition = null; // Исходная позиция элемента

  targets.forEach(target => {

    // Обработчик события начала касания (touchstart)
    target.addEventListener('touchstart', (e) => {
      if (!activeElement) {
        activeElement = target;
        startPosition = {
          left: target.style.left,
          top: target.style.top,
        };

        const touch = e.touches[0];
        offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
        offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
      }
    });

    // Обработчик события перемещения пальца (touchmove)
    document.addEventListener('touchmove', (e) => {
      if (activeElement) {
        const touch = e.touches[0];
        activeElement.style.left = touch.clientX - offsetX + 'px'; 
        activeElement.style.top = touch.clientY - offsetY + 'px';
      }
    });

    // Обработчик события окончания касания вторым пальцем
    document.addEventListener('touchend', (e) => {
      if (activeElement && e.touches.length > 1) {
        // Прерываем перетаскивание и возвращаем элемент на исходное место
        activeElement.style.left = startPosition.left;
        activeElement.style.top = startPosition.top;
        activeElement = null;
      }
    });
  });
});
