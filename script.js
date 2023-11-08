document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; // Активный элемент
  let flag = false; // Состояние перемещения элемента
  let offsetX, offsetY; // Смещение относительно курсора
  let startPosition = null; // Исходная позиция элемента
  let lastTouchStart = 0; // Время последнего touchstart

  targets.forEach(target => {

    // Обработчик события touchstart
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      if (currentTime - lastTouchStart < 1000) {
        // Если прошло менее 1 секунды с последнего touchstart, считаем это двойным нажатием
        if (activeElement) {
          activeElement.style.backgroundColor = 'green';
          e.preventDefault();
        } else {
          activeElement = target;
          startPosition = {
            left: target.style.left,
            top: target.style.top,
          };
          activeElement.style.backgroundColor = 'green';
          const touch = e.touches[0];
          offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
          offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
          e.preventDefault();
        }
      } else {
        lastTouchStart = currentTime;
        if (activeElement) {
          activeElement.style.backgroundColor = 'red';
          e.preventDefault();
        } else {
          activeElement = target;
          startPosition = {
            left: target.style.left,
            top: target.style.top,
          };
          activeElement.style.backgroundColor = 'red';
          const touch = e.touches[0];
          offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
          offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
          e.preventDefault();
        }
      }
    });
  });

  // Обработчик события touchmove
  document.addEventListener('touchmove', (e) => {
    if (activeElement) {
      const touch = e.touches[0];
      activeElement.style.left = touch.clientX - offsetX + 'px'; 
      activeElement.style.top = touch.clientY - offsetY + 'px';
      e.preventDefault();
    }
  });

  // Обработчик события touchend
  document.addEventListener('touchend', (e) => {
    lastTouchStart = 0;
    if (flag) {
      flag = false; // Прерываем перетаскивание
    } else {
      activeElement = null;
    }
  });

   // Обработчик события касания вторым пальцем
   document.addEventListener('touchstart', (e) => {
    if (activeElement && e.touches.length === 2) {
      activeElement.style.backgroundColor = 'red';
      activeElement.style.left = startPosition.left;
      activeElement.style.top = startPosition.top;
      activeElement = null; // Сбрасываем активный элемент
      e.preventDefault(); // Предотвращаем дефолтное действие браузера
    }
  });
});
