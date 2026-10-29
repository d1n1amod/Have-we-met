// nav

function loadNavigation() {
  const navHTML = `
    <nav class="main-nav">
      <ul class="page-links">
        <li class="home-link"><a href="index.html"> HOME </a></li>
        <li><a href="mustsee.html"> MUST SEE </a></li>
        <li><a href="swingby.html"> SWING BY </a></li>
        <li><a href="skip.html"> SKIP </a></li>
        <li><a href="getintouch.html"> GET IN TOUCH </a></li>
      </ul>
    </nav>
  `;

  const header = document.querySelector('header');
  
 
  if (header) 
    { 
      header.insertAdjacentHTML('afterend', navHTML);
  
   const isHomePage = window.location.pathname === '/' || window.location.pathname.includes('index');

      
      if (isHomePage) 
    {
      const homeBtn = document.querySelector('.home-link');
      if (homeBtn) homeBtn.style.display = 'none'; }


    const navLinks = document.querySelectorAll('.page-links a');
        const currentUrl = window.location.href; 

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
            
    if (currentUrl.includes(linkHref)) {
        link.classList.add('active');}
     });

    console.log('Navigation present');
    } 
   else {
    console.log('Header not found');}
}

loadNavigation();


const config = {
  imageCount: 10,
  visibleSlidesRight: 12,
  visibleSlidesLeft: 2,
  offsetStep: 12,
  rotationStep: -7,
  scaleStep: 0.05,
  blurStep: 0.25,
  brightnessStep: 0.1,
  minBrightness: 0.25,
  wheelSensitivity: 0.005,
  touchSensitivity: 0.0075,
  maxWheelDelta: 200,
  smoothing: 0.075,
  snapDelay: 250,
  swapThreshold: 0.5,
};

const slideCount = config.visibleSlidesLeft + config.visibleSlidesRight + 2;

const slider = document.querySelector(".slider");
const slidesContainer = document.querySelector(".slides");

for (let i = 0; i < slideCount; i++) {
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.innerHTML = `
    <div class="slide-img">
      <img alt="" />
    </div>
  `;
  slidesContainer.appendChild(slide);
}

const slides = document.querySelectorAll(".slide");

let currentPosition = 0;
let targetPosition = 0;
let scrollDirection = 1;

const wrapOffset = gsap.utils.wrap(
  -(config.visibleSlidesLeft + 1),
  slideCount - (config.visibleSlidesLeft + 1)
);
const wrapImageIndex = gsap.utils.wrap(0, config.imageCount);

function updateSlideImage(slide, position) {
  const imageIndex = wrapImageIndex(Math.round(position));
  if (slide.dataset.image === String(imageIndex)) return;

  slide.dataset.image = imageIndex;
  slide.querySelector("img").src = `./img/${imageIndex + 1}.png`;
}

function getSlideZIndex(offset) {
  const travelOffset = offset * scrollDirection;

  if (travelOffset >= 0) return Math.round(1000 - travelOffset * 10);

  if (travelOffset > -config.swapThreshold) return 1001;

  return Math.round(500 + travelOffset * 10);
}

function getSlideOpacity(offset) {
  const opacity =
    offset < 0
      ? config.visibleSlidesLeft + 1 + offset
      : config.visibleSlidesRight + 1 - offset;

  return gsap.utils.clamp(0, 1, opacity);
}

function renderSlides() {
  slides.forEach((slide, index) => {
    const offset = wrapOffset(index - currentPosition);
    const distance = Math.abs(offset);

    const blur = distance * config.blurStep;
    const brightness = Math.max(
      config.minBrightness,
      1 - distance * config.brightnessStep
    );

    updateSlideImage(slide, currentPosition + offset);

    gsap.set(slide, {
      xPercent: offset * config.offsetStep,
      rotation: offset * config.rotationStep,
      scale: 1 - distance * config.scaleStep,
      filter: `blur(${blur}px) brightness(${brightness})`,
      opacity: getSlideOpacity(offset),
      zIndex: getSlideZIndex(offset),
    });
  });
}

renderSlides();

let snapTimeout;

function snapToSlide() {
  const outgoingPosition =
    scrollDirection > 0
      ? Math.floor(targetPosition)
      : Math.ceil(targetPosition);
  const distanceMoved = Math.abs(targetPosition - outgoingPosition);

  targetPosition =
    distanceMoved < config.swapThreshold
      ? outgoingPosition
      : outgoingPosition + scrollDirection;
}

function moveSlider(amount) {
  if (amount === 0) return;

  scrollDirection = Math.sign(amount);
  targetPosition += amount;

  clearTimeout(snapTimeout);
  snapTimeout = setTimeout(snapToSlide, config.snapDelay);
}

slider.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    const delta = gsap.utils.clamp(
      -config.maxWheelDelta,
      config.maxWheelDelta,
      event.deltaY
    );

    moveSlider(delta * config.wheelSensitivity);
  },
  { passive: false }
);

let lastTouchY = 0;

slider.addEventListener("touchstart", (event) => {
  lastTouchY = event.touches[0].clientY;
});

slider.addEventListener("touchmove", (event) => {
  const touchY = event.touches[0].clientY;
  moveSlider((lastTouchY - touchY) * config.touchSensitivity);
  lastTouchY = touchY;
});

gsap.ticker.add(() => {
  if (currentPosition === targetPosition) return;

  currentPosition += (targetPosition - currentPosition) * config.smoothing;

  if (Math.abs(targetPosition - currentPosition) < 0.001) {
    currentPosition = targetPosition;
  }

  renderSlides();
});