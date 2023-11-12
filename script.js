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
      
        if (touchCount == 1) {
          touchCount = 0;
          activeElement = e.target;
          activeElement.style.backgroundColor = 'green';
          flag = true;
        } else {

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
      }
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
        clearTimeout(holdTimer);
        const currentTime = new Date().getTime();
        const touchDuration = currentTime - touchStartTime;
        if (touchDuration < 300) {
          touchCount++;
        } else {
          touchCount = 0;
          activeElement = null;
        }
      });

      document.addEventListener('touchstart', (e) => {
        if (flag == true && activeElement) {
          
          const touch = e.touches[0];
          const targetRect = activeElement.getBoundingClientRect();
          const targetX = touch.clientX - targetRect.width / 2;
          const targetY = touch.clientY - targetRect.height / 2;

          activeElement.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
          activeElement.style.left = targetX + 'px';
          activeElement.style.top = targetY + 'px';
          
        }
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
