document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; // Активный элемент
  let offsetX, offsetY; // Смещение относительно курсора
  let startPosition = null; // Исходная позиция элемента
  let touchCount = 0; // Счетчик касаний
  let touchStartTime = 0; // Время начала первого касания

  targets.forEach(target => {
    // Обработчик события касания начала
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
    
      if (touchCount === 0 || (currentTime - touchStartTime < 300)) {
        touchCount++;
        if (touchCount === 2) {
          touchCount = 0;
          activeElement = target;
          startPosition = {
            left: target.style.left,
            top: target.style.top,
          };
          activeElement.style.backgroundColor = 'green';
        } else {
          activeElement = target;
          startPosition = {
            left: target.style.left,
            top: target.style.top,
          };
          const touch = e.touches[0];
          offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
          offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
          e.preventDefault();
        }
      } else {
        touchStartTime = currentTime;
      }
    });
  
    // Обработчик события движения при касании
    document.addEventListener('touchmove', (e) => {
      if (activeElement) {
        const touch = e.touches[0];
        activeElement.style.left = touch.clientX - offsetX + 'px'; 
        activeElement.style.top = touch.clientY - offsetY + 'px';
        touchCount = null;
        e.preventDefault(); // Предотвращаем дефолтное действие браузера
      }
    });

    // Обработчик события завершения касания
    document.addEventListener('touchend', (e) => {
      activeElement = null; // Сбрасываем активный элемент
    });

    // Обработчик события касания вторым пальцем
    document.addEventListener('touchstart', (e) => {
      if (activeElement && e.touches.length === 2) {
        activeElement.style.left = startPosition.left;
        activeElement.style.top = startPosition.top;
        activeElement = null; // Сбрасываем активный элемент
        e.preventDefault(); // Предотвращаем дефолтное действие браузера
      }
    });
  });
});
