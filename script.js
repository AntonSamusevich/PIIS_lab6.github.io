document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; // Активный элемент
  let flag = false; // Состояние перемещения элемента
  let offsetX, offsetY; // Смещение относительно курсора
  let startPosition = null; // Исходная позиция элемента
  let touchCount = 0; // Счетчик касаний
  let touchStartTime = 0; // Время начала первого касания

  targets.forEach(target => {
    // Обработчик события касания начала
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      if (e.detail === 2) {
        // Если e.detail равно 2, считаем это двойным нажатием
        activeElement = target;
        startPosition = {
          left: target.style.left,
          top: target.style.top,
        };
        activeElement.style.backgroundColor = 'green';
      } else {
        activeElement = target;
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
        e.preventDefault(); // Предотвращаем дефолтное действие браузера
      }
    });

    // Обработчик события завершения касания
    document.addEventListener('touchend', (e) => {
      if (flag) {
        flag = false; // Прерываем перетаскивание
      } else {
        activeElement = null; // Сбрасываем активный элемент
      }
    });

    // Обработчик события касания вторым пальцем
    document.addEventListener('touchstart', (e) => {
      if (activeElement && e.touches.length === 2) {
        flag = false; // Прерываем перетаскивание
        activeElement.style.left = startPosition.left;
        activeElement.style.top = startPosition.top;
        activeElement = null; // Сбрасываем активный элемент
        e.preventDefault(); // Предотвращаем дефолтное действие браузера
      }
    });
  });
});
