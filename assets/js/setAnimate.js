const setAnimationDelay = (delay, containerDataName) => {
     const containers = document.querySelectorAll(`[${containerDataName}]`);
     containers.forEach(container => {
         const items = Array.from(container.children);
         const counterReset = +(container.getAttribute('data-delay-child-counter-reset'));
         let counter = 0;
         let currentDelay = delay;
         items.forEach(card => {
          card.setAttribute('data-aos-delay', `${currentDelay}`);
          currentDelay+=delay;
          counter++;
          if (counterReset && (counter === counterReset)) {
              currentDelay = delay;
              counter = 0;
          };
        });
     });
  }


setTimeout(() => {
    setAnimationDelay(200, 'data-delay-child');
}, 0);

