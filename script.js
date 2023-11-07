document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; // Активный элемент
  let flag = false; // Состояние перемещения элемента
  let followingFinger = false; // Режим "следующий за пальцем"
  let followingFingerElement = null; // Элемент, следящий за пальцем
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

        if (followingFinger) {
          followingFingerElement = target;
        }

        // Проверяем, если это двойное касание
        if (e.touches.length === 1) {
          if (flag) {
            flag = false; // Прерываем перетаскивание
          } else {
            activeElement.style.backgroundColor = 'red';
          }
        } else if (e.touches.length === 2) {
          followingFinger = !followingFinger;
          activeElement.style.backgroundColor = followingFinger ? 'green' : 'red';
        }

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

    // Обработчик события окончания касания (touchend)
    document.addEventListener('touchend', (e) => {
      if (flag) {
        flag = false; // Прерываем перетаскивание
      } else if (followingFingerElement) {
        followingFinger = false;
        followingFingerElement.style.backgroundColor = 'red';
        followingFingerElement = null;
      } else if (activeElement) {
        activeElement = null; // Сбрасываем активный элемент
      }
    });
  });
});
