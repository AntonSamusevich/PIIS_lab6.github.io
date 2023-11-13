document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');

  let activeElement = null;
  let touchStartTime = 0;
  let holdTimer = null;
  let clickCount = 0;
  let flag = false;

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
          flag = true;
        }
        else { 
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
      if (activeElement && flag === false) {
        const touch = e.touches[0];
        activeElement.style.left = touch.clientX - offsetX + 'px'; 
        activeElement.style.top = touch.clientY - offsetY + 'px';
        e.preventDefault();
      }
    });

    document.addEventListener('touchstart', (e) => {
      if (activeElement && flag === true) {
        
        const currentTime = new Date().getTime();
        const touchDuration = currentTime - touchStartTime;

        if (touchDuration < 300) {
          clickCount = 1;
        } 
        
        touchStartTime = currentTime;

        holdTimer = setTimeout(() => {
      
        if (clickCount === 1) {
          flag == false;
        } else {
          
        const touch = e.touches[0];
        const targetRect = activeElement.getBoundingClientRect();
        const targetX = touch.clientX - targetRect.width / 2;
        const targetY = touch.clientY - targetRect.height / 2;

        activeElement.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
        activeElement.style.left = targetX + 'px';
        activeElement.style.top = targetY + 'px';
        }
  
        clickCount = 0;
        }, 300);
      }
    });

    target.addEventListener('touchend', () => {
      if (activeElement && flag === false) {
        activeElement = null;
        activeElement.style.backgroundColor = 'red';
      } else {
      activeElement = null;
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
