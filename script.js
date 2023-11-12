document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');

  let activeElement = null; // Активный элемент
  let flag1 = false; // Состояние "следования за пальцем"
  let flag2 = false;
  let holdTimer = null;
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
          flag1 = true; // Устанавливаем флаг "следования за пальцем"
        } else {
          touchStartTime = currentTime;
        }
      } 
    });

    // Обработчик события завершения касания
    document.addEventListener('touchstart', (e) => {
      if (flag1 && activeElement) {
        // Получаем координаты точки нажатия
        const touch = e.touches[0];
        const targetRect = activeElement.getBoundingClientRect();
        const targetX = touch.clientX - targetRect.width / 2;
        const targetY = touch.clientY - targetRect.height / 2;

        // Анимация перемещения к точке нажатия
        activeElement.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
        activeElement.style.left = targetX + 'px';
        activeElement.style.top = targetY + 'px';
        flag2 = true;
      }
    });

    
    document.addEventListener('touchstart', (e) => {
      touchStartTime = currentTime;
      if (flag2 && activeElement) {
        if (e.changedTouches.length > 0) {
          holdTimer = setTimeout(() => {
          const touch = e.changedTouches[0];
          activeElement.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
          activeElement.style.left = touch.clientX - activeElement.offsetWidth / 2 + 'px';
          activeElement.style.top = touch.clientY - activeElement.offsetHeight / 2 + 'px';
          }, 2000);
        }
        e.preventDefault(); // Предотвращаем дефолтное действие браузера
      }
    });

    target.addEventListener('touchend', () => {
      clearTimeout(holdTimer);
    });
  });
});
