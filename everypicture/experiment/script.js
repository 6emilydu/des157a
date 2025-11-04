(function() {
  'use strict';

  const points = document.querySelectorAll('.point');
  const popups = document.querySelectorAll('.popup');

  function showPopup(dot) {
    // hide all popups first
    popups.forEach(popup => {
      popup.classList.remove('show');
    });

    // find popup
    const locationName = dot.getAttribute('data-popup');
    const popup = document.querySelector(`.popup[data-location="${locationName}"]`);

    if (popup) {
      popup.classList.add('show');

      // positioning popup
      const popupTop = dot.offsetTop + dot.offsetHeight + 10;
      const popupLeft = dot.offsetLeft + dot.offsetWidth / 2 - popup.offsetWidth / 2;

      popup.style.top = popupTop + 'px';
      popup.style.left = popupLeft + 'px';
    }
  }

  // click a point to show popup
  points.forEach(dot => {
    dot.addEventListener('click', function(e) {
      e.preventDefault(); 
      showPopup(dot);
    });
  });

  // click outside to hide all popups
  document.addEventListener('click', function(e) {
    let clickedOnDot = false;

    points.forEach(dot => {
      if (e.target === dot) {
        clickedOnDot = true;
      }
    });

    if (!clickedOnDot) {
      popups.forEach(popup => {
        popup.classList.remove('show');
      });
    }
  });
})();
