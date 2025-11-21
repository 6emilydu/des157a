    (function() {
  'use strict';

  const points = document.querySelectorAll('.point');
  const popups = document.querySelectorAll('.popup');
  const baseMap = document.querySelector('.world-map');
  const countries = [
    { area: '#country1-area', img: '#country1' },
    { area: '#country2-area', img: '#country2' },
    { area: '#country3-area', img: '#country3' },
    { area: '#country4-area', img: '#country4' },
    { area: '#country5-area', img: '#country5' }
  ];

  // hide all images
  function resetImages() {
    countries.forEach(function(country) {
      document.querySelector(country.img).style.display = 'none';
    });
  }

  // hover over countries
  countries.forEach(function(country) {
    const areaEl = document.querySelector(country.area);
    const imgEl = document.querySelector(country.img);

    areaEl.addEventListener('mouseover', function() {
      resetImages();
      imgEl.style.display = 'block';
    });

    areaEl.addEventListener('mouseout', function() {
      resetImages();
      baseMap.style.display = 'block';
    });
  });

  function showPopup(dot) {
    // hide all popups first
    for (let i = 0; i < popups.length; i++) {
      popups[i].className = 'popup'; 
    }

    // find popup
    const locationName = dot.getAttribute('data-popup');
    const popup = document.querySelector(`.popup[data-location="${locationName}"]`);

    if (popup) {
      popup.className = 'popup show'; 

      // positioning popup
    popup.style.position = 'fixed';
    popup.style.top = '53%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    }
  }

  // click a point to show popup
  points.forEach(function(dot) {
    dot.addEventListener('click', function(e) {
      e.preventDefault(); 
      showPopup(dot);
    });
  });

  // click outside to hide all popups
  document.addEventListener('click', function(e) {
    let clickedOnDot = false;

    points.forEach(function(dot) {
      if (e.target === dot) {
        clickedOnDot = true;
      }
    });

    if (!clickedOnDot) {
      for (let i = 0; i < popups.length; i++) {
        popups[i].className = 'popup'; // hide all
      }
    }
  });
})();
