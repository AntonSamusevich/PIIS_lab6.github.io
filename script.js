document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');

  let activeElement = null;
  let touchStartTime = 0;
  let holdTimer = null;
  let clickCount = 0;

  targets.forEach(target => {
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      const elapsed = currentTime - touchStartTime;

      if (elapsed < 300) {
        // Если прошло менее 300 миллисекунд, считаем это быстрым двойным нажатием
        clickCount++;
      } else {
        // В противном случае начинаем отсчет заново
        clickCount = 1;
      }

      touchStartTime = currentTime;

      // Ожидаем 300 миллисекунд для следующего нажатия
      holdTimer = setTimeout(() => {
        if (clickCount === 2) {
          // Ваш код для обработки быстрого двойного нажатия
          activeElement = target;
          activeElement.style.backgroundColor = 'blue';
          console.log('Быстрое двойное нажатие');
        }

        // Сбрасываем счетчик
        clickCount = 0;
      }, 300);

      e.preventDefault();
    });
  });
});
