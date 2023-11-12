document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; 
  let flag = false; 
  let offsetX, offsetY; 
  let startPosition = null; 
  let touchCount = 0; 
  let touchStartTime = 0; 

  targets.forEach(target => {
    
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      touchStartTime = currentTime;
      holdTimer = setTimeout(() => {
        activeElement = target;
        startPosition = {
          left: target.style.left,
          top: target.style.top,
        };
        const touch = e.touches[0];
        offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
        offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
      },2000);
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
      clearTimeout(holdTimer);
    });

    document.addEventListener('touchstart', (e) => {
      if (activeElement && e.touches.length === 2) {
        activeElement.style.left = startPosition.left;
        activeElement.style.top = startPosition.top;
        activeElement = null; 
        e.preventDefault(); 
      }
    });
  });
});
