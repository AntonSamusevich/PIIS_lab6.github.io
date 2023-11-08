document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; // активный элемент
  let flag = false; // состояние перемещения элемента
  let offsetX, offsetY; // смещение относительно курсора
  let startPosition = null; // исходная позиция элемента
  let lastTapTime = 0; // время последнего касания
  const doubleTapDelay = 300; // задержка для определения двойного нажатия (в миллисекундах)

  targets.forEach(target => {

    // Обработчик события касания начала
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      const timeSinceLastTap = currentTime - lastTapTime;

      if (timeSinceLastTap < doubleTapDelay) {
        // Обнаружено двойное нажатие одним пальцем
        handleDoubleTap(target);
      } else {
        // Обычное касание
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

      lastTapTime = currentTime;
      e.preventDefault();
    });
  });

  // Обработчик события движения при касании
  document.addEventListener('touchmove', (e) => {
    if (activeElement) {
      const touch = e.touches[0];
      activeElement.style.left = touch.clientX - offsetX + 'px'; 
      activeElement.style.top = touch.clientY - offsetY + 'px';
      e.preventDefault();
    }
  });

  // Обработчик события завершения касания
  document.addEventListener('touchend', (e) => {
    if (flag) {
      flag = false;
    } else {
      activeElement = null;
    }
  });

  function handleDoubleTap(element) {
    // Обработка двойного нажатия
    // Здесь вы можете добавить свой код для обработки двойного нажатия одним пальцем
    // Например, изменение стиля элемента или выполнение другой логики
    element.style.backgroundColor = 'blue';
  }
});
