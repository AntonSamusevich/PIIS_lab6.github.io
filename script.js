document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.target');

  let activeElement = null; //активный элемент
  let touchStartTime = 0; //время начала касания
  let holdTimer = null; //таймер удержания
  let clickCount = 0; //счетчик кликов
  let flag = false; //флаг режима 

  targets.forEach(target => {

    //Обработчик события начала касания
    target.addEventListener('touchstart', (e) => {
      if (!activeElement) {
        const currentTime = new Date().getTime();
        const touchDuration = currentTime - touchStartTime;

        if (touchDuration < 300) {  
          clickCount++;
        } else {
          clickCount = 1;
        }

        touchStartTime = currentTime;

        holdTimer = setTimeout(() => {
          if (clickCount === 2) { //двойное нажатие
            activeElement = target;
            activeElement.style.backgroundColor = 'green';
            flag = true;
          } else {
            activeElement = e.target;
            startPosition = {
              left: target.style.left,
              top: target.style.top,
            };
            //объект первого касания из массива
            const touch = e.touches[0];
            //координаты места касания
            offsetX = touch.clientX - activeElement.getBoundingClientRect().left;
            offsetY = touch.clientY - activeElement.getBoundingClientRect().top;
            flagMove = true;
          }
          clickCount = 0;
        }, 300);

        e.preventDefault();
      }
    });

    //обработчик события движения при касании
    document.addEventListener('touchmove', (e) => {
      if (activeElement && flagMove === true) {
        const touch = e.touches[0];
        //смещение относительно начального положения
        activeElement.style.left = touch.clientX - offsetX + 'px'; 
        activeElement.style.top = touch.clientY - offsetY + 'px';
        e.preventDefault();
      }
    });

    //обработчик события режима "следующий за пальцем" 
    document.addEventListener('touchstart', (e) => {
      if (activeElement && flag === true) {
        const currentTime = new Date().getTime();
        const touchDuration = currentTime - touchStartTime;

        if (touchDuration < 300) {
          clickCount = 1;
          flag = false;
        } else {
          clickCount = 0;
        }

        touchStartTime = currentTime;

        holdTimer = setTimeout(() => {
          if (clickCount === 1) {
            flag = false;
          } else {
            
            //получаем координаты точки нажатия
            const touch = e.touches[0];
            const targetRect = activeElement.getBoundingClientRect();
            const targetX = touch.clientX - targetRect.width / 2;
            const targetY = touch.clientY - targetRect.height / 2;

            //анимация перемещения к точке нажатия
            activeElement.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
            activeElement.style.left = targetX + 'px';
            activeElement.style.top = targetY + 'px';
            flag = true;
          }
          clickCount = 0;
        }, 300);
      }
    });
    
    //обработчик события завершения касания
    target.addEventListener('touchend', () => {
      if (activeElement && flag === false) {
        activeElement.style.transition = 'none';
        activeElement.style.backgroundColor = 'red';
        activeElement = null;
        flag = false;
      } else {
        activeElement = null;
        flagMove = false;
      }
    });

    //обработчик события касания вторым пальцем
    document.addEventListener('touchstart', (e) => {
      if (activeElement && e.touches.length === 2) {
        activeElement.style.transition = 'none';
        activeElement.style.backgroundColor = 'red';
        activeElement.style.left = startPosition.left;
        activeElement.style.top = startPosition.top;
        activeElement = null; 
        flag = false;
        e.preventDefault(); 
      }
    });
  });
});
