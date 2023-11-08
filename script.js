document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; // Активный элемент
  let flag = false; // Состояние перемещения элемента
  let offsetX, offsetY; // Смещение относительно курсора
  let startPosition = null; // Исходная позиция элемента
  let followingFinger = false; // Режим следования за пальцем
  let lastTouchEnd = 0; // Время последнего touchend

  targets.forEach(target => {

    // Обработчик события touchstart
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      if (followingFinger) {
        // Если включен режим следования за пальцем, игнорируем touchstart
        e.preventDefault();
      } else if (activeElement && currentTime - lastTouchEnd < 300) {
        // Если прошло менее 300 миллисекунд с последнего touchend, считаем это двойным касанием
        flag = false;
        followingFinger = true;
        activeElement.style.backgroundColor = 'green';
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
    lastTouchEnd = new Date().getTime();
    if (flag) {
      flag = false; // Прерываем перетаскивание
    } else if (followingFinger) {
      followingFinger = false;
      activeElement.style.backgroundColor = 'red';
    } else {
      activeElement = null;
    }
  });
});
