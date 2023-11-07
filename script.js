document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');
  let activeElement = null;
  let isDragging = false;
  let offsetX, offsetY;
  let originalPosition = null;

  targets.forEach(target => {
    target.addEventListener('touchstart', (e) => {
      if (!isDragging) {
        isDragging = true;
        activeElement = target;
        originalPosition = {
          left: target.style.left,
          top: target.style.top,
        };
        offsetX = e.touches[0].clientX - activeElement.getBoundingClientRect().left;
        offsetY = e.touches[0].clientY - activeElement.getBoundingClientRect().top;
      } else {
        isDragging = false;
        activeElement = null;
      }
    });

    target.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        activeElement = null;
      }
    });
  });

  document.addEventListener('touchmove', (e) => {
    if (activeElement) {
      activeElement.style.left = e.touches[0].clientX - offsetX + 'px';
      activeElement.style.top = e.touches[0].clientY - offsetY + 'px';
    }
  });

  document.addEventListener('touchend', () => {
    activeElement = null;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeElement) {
      isDragging = false;
      activeElement.style.left = originalPosition.left;
      activeElement.style.top = originalPosition.top;
      activeElement = null;
    }
  });
});
