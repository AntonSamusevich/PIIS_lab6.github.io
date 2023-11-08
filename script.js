document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');
  
  let activeElement = null; // Активный элемент
  let flag = false; // Состояние перемещения элемента
  let isFollowingFinger = false; // Флаг для следования за пальцем
  let offsetX, offsetY; // Смещение относительно курсора
  let startPosition = null; // Исходная позиция элемента

  targets.forEach(target => {
    target.addEventListener('touchstart', (e) => {
      activeElement = target;
      startPosition = {
        left: target.style.left,
        top: target.style.top,
      };

      const touch = e.touches[0];
      offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
      offsetY = touch.clientY - activeElement.getBoundingClientRect().top;

      if (e.touches.length === 2) {
        flag = true;
        isFollowingFinger = false;
        activeElement.style.backgroundColor = 'green';
      } else {
        if (!isFollowingFinger) {
          activeElement.style.backgroundColor = 'red';
        }
      }

      e.preventDefault();
    });
  });

  document.addEventListener('touchmove', (e) => {
    if (activeElement) {
      const touch = e.touches[0];
      if (isFollowingFinger) {
        // Если элемент следует за пальцем, обновите его позицию
        activeElement.style.left = touch.clientX - offsetX + 'px';
        activeElement.style.top = touch.clientY - offsetY + 'px';
      }

      e.preventDefault();
    }
  });

  document.addEventListener('touchend', (e) => {
    if (flag) {
      flag = false;
    } else {
      activeElement = null;
    }
  });

  document.addEventListener('touchstart', (e) => {
    if (activeElement && e.touches.length === 2) {
      flag = false;
      isFollowingFinger = false;
      activeElement.style.backgroundColor = 'red';
      activeElement.style.left = startPosition.left;
      activeElement.style.top = startPosition.top;
      activeElement = null;
      e.preventDefault();
    } else if (activeElement && e.touches.length === 1) {
      // Проверка, если элемент должен следовать за пальцем после двойного нажатия
      isFollowingFinger = true;
    }
  });
});
