document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');

  let activeElement = null; // Активный элемент
  let followingFinger = false; // Состояние "следования за пальцем"
  let startPosition = null; // Исходная позиция элемента
  let touchCount = 0; // Счетчик касаний
  let touchStartTime = 0; // Время начала первого касания

  targets.forEach(target => {
    // Обработчик события касания начала
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
          followingFinger = true; // Устанавливаем флаг "следования за пальцем"
          
          // Получаем координаты точки нажатия
          const touch = e.touches[0];
          const targetRect = activeElement.getBoundingClientRect();
          const targetX = touch.clientX - targetRect.width / 2;
          const targetY = touch.clientY - targetRect.height / 2;

          // Анимация перемещения к точке нажатия
          activeElement.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
          activeElement.style.left = targetX + 'px';
          activeElement.style.top = targetY + 'px';
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
        e.preventDefault();
      }
    });

    // Обработчик события завершения касания
    document.addEventListener('touchend', (e) => {
      if (followingFinger && activeElement) {
        const touch = e.touches[0];
        // Перемещение элемента к точке нажатия
        activeElement.style.left = touch.clientX - activeElement.offsetWidth / 2 + 'px';
        activeElement.style.top = touch.clientY - activeElement.offsetHeight / 2 + 'px';
        e.preventDefault(); // Предотвращаем дефолтное действие браузера
        
      }
    });

    // Обработчик события движения при касании
    document.addEventListener('touchmove', (e) => {
      if (followingFinger && activeElement) {
        const touch = e.touches[0];
        // Перемещение элемента к точке нажатия
        activeElement.style.left = touch.clientX - activeElement.offsetWidth / 2 + 'px';
        activeElement.style.top = touch.clientY - activeElement.offsetHeight / 2 + 'px';
        e.preventDefault(); // Предотвращаем дефолтное действие браузера
      }
    });
  });
});
