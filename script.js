document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; //активный элемент
  let flag = false; //состояние перемещения элемента
  let offsetX, offsetY; //смещение относительно курсора
  let startPosition = null; //исходная позиция элемента

  targets.forEach(target => {

    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      if (touchCount === 0 || (currentTime - touchStartTime < 300)) {
        // Если прошло менее 0.3 секунды с начала первого касания, увеличиваем счетчик
        touchCount++;
        if (touchCount === 2) {
          // Если счетчик достиг двух, считаем это двойным нажатием
          touchCount = 0;
          activeElement = target;
          startPosition = {
            left: target.style.left,
            top: target.style.top,
          };
          activeElement.style.backgroundColor = 'green';
        } else {
          touchStartTime = currentTime;
        }
      } else {
        touchCount = 0;
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
    });
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
      activeElement.style.backgroundColor = 'red';
      activeElement.style.left = startPosition.left;
      activeElement.style.top = startPosition.top;
      activeElement = null; // Сбрасываем активный элемент
      e.preventDefault(); // Предотвращаем дефолтное действие браузера
    }
  });
});
