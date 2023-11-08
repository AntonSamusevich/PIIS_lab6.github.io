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
      touchCount++;
      if (touchCount === 1) {
        // Если это первое касание, запускаем таймер для проверки на двойное касание
        setTimeout(() => {
          if (!isDragging) {
            // Если не было перемещения, меняем цвет
            activeElement.style.backgroundColor = 'green';
          }
          touchCount = 0;
        }, 300); // Измените задержку, если необходимо
      } else if (touchCount === 2) {
        // Если это второе касание, считаем его двойным
        touchCount = 0;
        isDragging = false;
        activeElement.style.backgroundColor = 'red';
      }
      activeElement = target;
      startPosition = {
        left: target.style.left,
        top: target.style.top,
      };
      const touch = e.touches[0];
      offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
      offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
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
