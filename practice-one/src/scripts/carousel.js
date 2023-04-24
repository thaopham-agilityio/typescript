// Const's
const sliderAutoChangeTime = 5000;
const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.item');
const sliderCount = slides.length;
const dotNavigation = document.querySelector('.dot-navigation');

// Create Dot Navigation
slides.forEach(() => {
  dotNavigation.innerHTML += '<li class="dot"></li>';
});

// Secondary Const's (now things are dynamically built)
const dots = document.querySelectorAll('.dot-navigation .dot');

// Activate First Dot Navigation
dots[0].classList.add('active');

// Activate First Slider
slides[0].classList.add('active');

// Create Dot Navigation 'click' events
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    setActiveSliderIndex(index);
  });
});

// Move to Next Slider
const MoveToNextSlider = () => {
  const currentIndex = currentLiveIndex();
  const nextIndex = currentIndex + 1 > sliderCount - 1 ? 0 : currentIndex + 1;
  setActiveSliderIndex(nextIndex);
};

// Current Live Slide Index
let currentLiveIndex = () => {
  let response;
  slides.forEach((li, index) => {
    if (li.classList.contains('active')) response = index;
  });
  return response;
};

// Set Slider and Dot Nav Active
let setActiveSliderIndex = (activeSliderIndex) => {
  // Changes Slider
  slider.querySelector('li.active').classList.remove('active');
  slides[activeSliderIndex].classList.add('active');
  // Change Dot Navigation
  dotNavigation.querySelector('li.active').classList.remove('active');
  dots[activeSliderIndex].classList.add('active');
  // Reset Timer
  restartInterval();
};

// Timer
let timer = setInterval(MoveToNextSlider, sliderAutoChangeTime);

// Reset time between sliders
let restartInterval = () => {
  clearInterval(timer);
  timer = setInterval(MoveToNextSlider, sliderAutoChangeTime);
};

// Pause on hover
slider.addEventListener('mouseover', () => {
  clearInterval(timer);
});
slider.addEventListener('mouseout', () => {
  restartInterval();
});
