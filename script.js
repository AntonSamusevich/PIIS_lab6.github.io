document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; //активный элемент
  let flag = false; //состояние перемещения элемента
  let offsetX, offsetY; //смещение относительно курсора
  let startPosition = null; //исходная позиция элемента

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
      } else {
        activeElement.style.backgroundColor = 'red';
      }
      const touch = e.touches[0];
      offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
      offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
      e.preventDefault(); // Предотвращаем дефолтное действие браузера
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
      activeElement.style.backgroundColor = 'red';
      activeElement.style.left = startPosition.left;
      activeElement.style.top = startPosition.top;
      activeElement = null; // Сбрасываем активный элемент
      e.preventDefault(); // Предотвращаем дефолтное действие браузера
    }
  });
});
