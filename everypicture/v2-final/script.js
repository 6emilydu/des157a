    (function() {
  'use strict';

  const points = document.querySelectorAll('.point');
  const popups = document.querySelectorAll('.popup');

  // area of the countries
  const area1 = document.querySelector('#country1-area');
  const area2 = document.querySelector('#country2-area');
  const area3 = document.querySelector('#country3-area');
  const area4 = document.querySelector('#country4-area');
  const area5 = document.querySelector('#country5-area');

  // selecting the country
  const img1 = document.querySelector('#country1');
  const img2 = document.querySelector('#country2');
  const img3 = document.querySelector('#country3');
  const img4 = document.querySelector('#country4');
  const img5 = document.querySelector('#country5');
  const baseMap = document.querySelectorAll('.world-map'); 

  // hide all
  function resetImages() {
    img1.style.display = 'none';
    img2.style.display = 'none';
    img3.style.display = 'none';
    img4.style.display = 'none';
    img5.style.display = 'none';
  }

  // hovering over the countries
  area1.addEventListener('mouseover', function() {
    resetImages();
    img1.style.display = 'block';
  });
  area1.addEventListener('mouseout', function() {
    resetImages();
    baseMap.style.display = 'block';
  });

  area2.addEventListener('mouseover', function() {
    resetImages();
    img2.style.display = 'block';
  });
  area2.addEventListener('mouseout', function() {
    resetImages();
    baseMap.style.display = 'block';
  });

  area3.addEventListener('mouseover', function() {
    resetImages();
    img3.style.display = 'block';
  });
  area3.addEventListener('mouseout', function() {
    resetImages();
    baseMap.style.display = 'block';
  });

  area4.addEventListener('mouseover', function() {
    resetImages();
    img4.style.display = 'block';
  });
  area4.addEventListener('mouseout', function() {
    resetImages();
    baseMap.style.display = 'block';
  });

  area5.addEventListener('mouseover', function() {
    resetImages();
    img5.style.display = 'block';
  });
  area5.addEventListener('mouseout', function() {
    resetImages();
    baseMap.style.display = 'block';
  });


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
    const popupTop = dot.offsetTop - 250;
    const popupLeft = dot.offsetLeft -650; 

    popup.style.top = `${popupTop}px`;
    popup.style.left = `${popupLeft}px`;

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
