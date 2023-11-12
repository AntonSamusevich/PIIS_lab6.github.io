document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target'); 
  
  let activeElement = null; 
  let flag = false; 
  let offsetX, offsetY; 
  let startPosition = null; 
  let touchCount = 0; 
  let touchStartTime = 0; 
  let holdTimer = null;

  targets.forEach(target => {
    
    target.addEventListener('touchstart', (e) => {
      const currentTime = new Date().getTime();
      touchStartTime = currentTime;
    
      holdTimer = setTimeout(() => {
        activeElement = e.target;
        startPosition = {
          left: target.style.left,
           top: target.style.top,
        };
        const touch = e.touches[0];
        offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
        offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
      }, 500);

      e.preventDefault();
    });

    

    document.addEventListener('touchend', (e) => {
      clearTimeout(holdTimer);
      const currentTime = new Date().getTime();
      const touchDuration = currentTime - touchStartTime;
      if (touchCount == 1) {
        touchCount = 0;
        activeElement = e.target;
        activeElement.style.backgroundColor = 'green';
        activeElement = null;
      }
      else if (touchDuration < 300) {
        touchCount++;
      } else {
        touchCount = 0;
        activeElement = null;
      }
    });

    
  });
});
