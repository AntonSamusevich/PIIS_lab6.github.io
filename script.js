document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');

  let activeElement = null;
  let touchStartTime = 0;
  let holdTimer = null;

  targets.forEach(target => {
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      touchStartTime = currentTime;

      holdTimer = setTimeout(() => {
        // Ваш код для обработки удержания
        activeElement = target;
        activeElement.style.backgroundColor = 'green';
        console.log('Удержание');
      }, 2000); // 2 секунды

      e.preventDefault();
    });

    target.addEventListener('touchmove', (e) => {
      clearTimeout(holdTimer); // Очищаем таймер при движении
    });

    target.addEventListener('touchend', () => {
      clearTimeout(holdTimer); // Очищаем таймер при отпускании
      const currentTime = new Date().getTime();
      const touchDuration = currentTime - touchStartTime;

      if (touchDuration < 300) {
        // Ваш код для обработки быстрого нажатия
        activeElement = target;
        activeElement.style.backgroundColor = 'blue';
        console.log('Быстрое нажатие');
      }
    });
  });
});
