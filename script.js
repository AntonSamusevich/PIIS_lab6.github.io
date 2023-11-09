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
      if (touchCount === 0) {
        // Если touchCount равен 0, это первое касание
        touchCount = 1;
        activeElement = target;
        startPosition = {
          left: target.style.left,
          top: target.style.top,
        };
        const touch = e.touches[0];
        offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
        offsetY = touch.clientY - activeElement.getBoundingClientRect().top;

        // Запускаем таймер для определения удержания пальца
        setTimeout(() => {
          if (touchCount === 1 && activeElement) {
            // Если прошла секунда и палец все еще удерживается, разрешаем перемещение
            flag = true;
          }
        }, 1000);
      } else if (touchCount === 1 && currentTime - touchStartTime < 1000) {
        // Если touchCount равен 1 и прошло менее 1 секунды с начала первого касания, считаем это двойным нажатием
        touchCount = 0;
        activeElement.style.backgroundColor = 'green';
      } else {
        // В остальных случаях сбрасываем touchCount и начинаем перемещение
        touchCount = 0;
        activeElement = target;
        startPosition = {
          left: target.style.left,
          top: target.style.top,
        };
        const touch = e.touches[0];
        offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
        offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
        flag = false; // Сбрасываем состояние перемещения
        e.preventDefault();
      }
      touchStartTime = currentTime;
    });
    
    // Обработчик события движения при касании
    document.addEventListener('touchmove', (e) => {
      if (activeElement && flag) {
        const touch = e.touches[0];
        activeElement.style.left = touch.clientX - offsetX + 'px'; 
        activeElement.style.top = touch.clientY - offsetY + 'px';
        e.preventDefault();
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
