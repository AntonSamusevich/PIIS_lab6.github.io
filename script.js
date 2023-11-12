document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');

  let activeElement = null;
  let touchStartTime = 0;
  let holdTimer = null;
  let clickCount = 0;
  let offsetX, offsetY, startPosition;

  targets.forEach(target => {
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      const touchDuration = currentTime - touchStartTime;

      if (touchDuration < 300) {
        clickCount++;
      } else {
        clickCount = 1;
      }

      touchStartTime = currentTime;

      holdTimer = setTimeout(() => {
        if (clickCount === 2) {
          activeElement = target;
          activeElement.style.backgroundColor = 'green';
        }
        clickCount = 0;
      }, 300);

      holdTimer = setTimeout(() => {
        if (clickCount === 1) {
          activeElement = e.target;
          startPosition = {
            left: target.style.left,
            top: target.style.top,
          };
          const touch = e.touches[0];
          offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
          offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
        }
        clickCount = 0;
      }, 300);

      e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
      if (activeElement) {
        const touch = e.touches[0];
        activeElement.style.left = touch.clientX - offsetX + 'px'; 
        activeElement.style.top = touch.clientY - offsetY + 'px';
        e.preventDefault();
      }
    });

    document.addEventListener('touchend', (e) => {
      activeElement = null;
    });
  });
});
