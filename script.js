document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');

  let activeElement = null; // Активный элемент
  let touchCount = 0; // Счетчик касаний

  targets.forEach(target => {
    // Обработчик события касания
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      if (touchCount === 0 || (currentTime - touchCount < 300)) {
        // Если прошло менее 0.3 секунды с начала первого касания, увеличиваем счетчик
        touchCount++;
        if (touchCount === 2) {
          // Если счетчик достиг двух, считаем это двойным нажатием
          touchCount = 0;
          activeElement = target;
          activeElement.style.backgroundColor = 'green';
        }
      } else {
        touchCount = 0;
        activeElement = target;
        const touch = e.touches[0];
        activeElement.startX = touch.clientX - activeElement.getBoundingClientRect().left;
        activeElement.startY = touch.clientY - activeElement.getBoundingClientRect().top;
        e.preventDefault();
      }
    });

    // Обработчик события движения при касании
    document.addEventListener('touchmove', (e) => {
      if (activeElement) {
        const touch = e.touches[0];
        activeElement.style.left = touch.clientX - activeElement.startX + 'px';
        activeElement.style.top = touch.clientY - activeElement.startY + 'px';
        e.preventDefault();
      }
    });

    // Обработчик события завершения касания
    document.addEventListener('touchend', (e) => {
      if (touchCount === 1) {
        // Если одно из касаний завершилось, сбрасываем активный элемент
        touchCount = 0;
        activeElement = null;
      }
    });
  });
});
