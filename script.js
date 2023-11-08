document.addEventListener('DOMContentLoaded', function () {
  const div = document.querySelector('.target');
  
  let followingFinger = false; // Режим следования за пальцем
  let lastTouchEnd = 0; // Время последнего touchend
  let offsetX, offsetY; // Смещение относительно курсора

  // Обработчик события touchstart для div
  div.addEventListener('touchstart', (e) => {
    const currentTime = new Date().getTime();
    if (followingFinger) {
      // Если включен режим следования за пальцем, игнорируем touchstart
      e.preventDefault();
    } else if (currentTime - lastTouchEnd < 300) {
      // Если прошло менее 300 миллисекунд с последнего touchend, считаем это двойным касанием
      followingFinger = true;
      const touch = e.touches[0];
      offsetX = touch.clientX - div.getBoundingClientRect().left;
      offsetY = touch.clientY - div.getBoundingClientRect().top;
      e.preventDefault();
    }
  });

  // Обработчик события touchmove для div
  div.addEventListener('touchmove', (e) => {
    if (followingFinger) {
      const touch = e.touches[0];
      div.style.left = touch.clientX - offsetX + 'px';
      div.style.top = touch.clientY - offsetY + 'px';
      e.preventDefault();
    }
  });

  // Обработчик события touchend для div
  div.addEventListener('touchend', (e) => {
    if (followingFinger) {
      followingFinger = false;
      lastTouchEnd = new Date().getTime();
      e.preventDefault();
    }
  });
});
