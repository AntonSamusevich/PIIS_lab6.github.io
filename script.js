document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; // активный элемент
  let flag = false; // состояние перемещения элемента
  let followingFinger = false; // флаг режима "следования за пальцем"
  let offsetX, offsetY; // смещение относительно курсора
  let startPosition = null; // исходная позиция элемента

  targets.forEach(target => {

    // Обработчик события касания начала
    target.addEventListener('touchstart', (e) => {
      activeElement = target;
      startPosition = {
        left: target.style.left,
        top: target.style.top,
      };
      if (e.touches.length === 2) { // Двойное касание
        flag = true;
        activeElement.style.backgroundColor = 'green';
        followingFinger = false; // Выход из режима "следования за пальцем"
      } else {
        activeElement.style.backgroundColor = 'red';
        if (!followingFinger) {
          const touch = e.touches[0];
          offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
          offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
        }
      }
      e.preventDefault(); // Предотвращаем дефолтное действие браузера
    });
  });

  // Обработчик события движения при касании
  document.addEventListener('touchmove', (e) => {
    if (activeElement) {
      if (flag) {
        // Режим перемещения
        const touch = e.touches[0];
        activeElement.style.left = touch.clientX - offsetX + 'px'; 
        activeElement.style.top = touch.clientY - offsetY + 'px';
        e.preventDefault(); // Предотвращаем дефолтное действие браузера
      } else if (followingFinger) {
        // Режим "следования за пальцем"
        const touch = e.touches[0];
        activeElement.style.left = touch.clientX - offsetX + 'px'; 
        activeElement.style.top = touch.clientY - offsetY + 'px';
        e.preventDefault(); // Предотвращаем дефолтное действие браузера
      }
    }
  });

  // Обработчик события завершения касания
  document.addEventListener('touchend', (e) => {
    if (flag) {
      flag = false; // Прерываем перетаскивание
      followingFinger = false; // Выход из режима "следования за пальцем"
    } else {
      activeElement = null; // Сбрасываем активный элемент
      if (followingFinger) {
        e.preventDefault(); // Предотвращаем дефолтное действие браузера при завершении "следования за пальцем"
      }
    }
  });

  // Обработчик события касания вторым пальцем
  document.addEventListener('touchstart', (e) => {
    if (activeElement && e.touches.length === 2) {
      flag = false; // Прерываем перетаскивание
      activeElement.style.backgroundColor = 'red';
      activeElement.style.left = startPosition.left;
      activeElement.style.top = startPosition.top;
      followingFinger = true; // Входим в режим "следования за пальцем"
      e.preventDefault(); // Предотвращаем дефолтное действие браузера
    }
  });

  // Обработчик события touchstart за пределами активного элемента
  document.addEventListener('touchstart', (e) => {
    if (activeElement && e.touches.length === 1 && !flag) {
      // Если не в режиме перемещения и не в режиме "следования за пальцем"
      activeElement = null;
      followingFinger = false;
    }
  });
});
