document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; // Активный элемент
  let offsetX, offsetY; // Смещение относительно курсора
  let startPosition = null; // Исходная позиция элемента

  targets.forEach(target => {
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      if (e.detail === 2) {
        // Если e.detail равно 2, считаем это двойным нажатием
        activeElement = target;
        startPosition = {
          left: target.style.left,
          top: target.style.top,
        };
        activeElement.style.backgroundColor = 'green';
      } else {
        activeElement = target;
        const touch = e.touches[0];
        offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
        offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
        e.preventDefault();
      }
    });

    document.addEventListener('touchmove', (e) => {
      if (activeElement) {
        const touch = e.touches[0];
        activeElement.style.left = touch.clientX - offsetX + 'px'; 
        activeElement.style.top = touch.clientY - offsetY + 'px';
        e.preventDefault();
      }
    });

    document.addEventListener('touchend', () => {
      activeElement = null;
    });
  });
});
