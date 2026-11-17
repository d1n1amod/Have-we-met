// nav

function loadNavigation() {
  const navHTML = `
    <nav class="main-nav">
      <ul class="page-links">
        <li><a href="../index.html"> HOME </a></li>
        <li><a href="../pages/mustsee.html"> MUST SEE </a></li>
        <li><a href="../pages/swingby.html"> SWING BY </a></li>
        <li><a href="../pages/skip.html"> SKIP </a></li>
        <li><a href="../pages/getintouch.html"> GET IN TOUCH </a></li>
      </ul>
    </nav>
  `;

  const header = document.querySelector('header');
  
 
  if (header) 
    { 
      header.insertAdjacentHTML('afterend', navHTML);
      console.log('Navigation present');
    }
  }


  // svg animation

  function animateNav(){

    const navBtns = document.querySelectorAll('.page-links a');
    const currentFile = window.location.pathname.split('/').pop() || 'index.html'; 

    navBtns.forEach(link => {
    const linkFile = link.getAttribute('href').split('/').pop();
            
    if (currentFile === linkFile) {
    link.classList.add('active');

    const originalSvg = document.querySelector("svg");
                
    if (originalSvg) {
                    
    originalSvg.style.display = "block";
    originalSvg.setAttribute("class", "circle-svg");
                    
                    
     link.appendChild(originalSvg);

      gsap.from("#circle", {
      drawSVG: "0%",
      duration: 1.5, 
       ease: "power2.inOut",
  });

  console.log('Circle animation present');
}  
} 
    
});
    
}
loadNavigation();
animateNav();



// draggable

const sliderElement = document.querySelector(".slider");

if (sliderElement){

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
  slide.querySelector("img").src = `../img/${imageIndex + 1}.png`;
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
}


// api
const artworksData = {

     'mustsee': [
        { title: 'Mihrab Prayer Niche', text: 'It warms my heart to think about the amount of time and consideration put into a sacred practice of prayer.' },
        { title: 'The Storm Pierre Auguste Cot', text: 'A reminder that there is love in everything even inconvenience.' },
        { title: 'Modern Rome Giovanni Paolo Panini', text: 'A truly unique piece. In awe of the intricate detail. Felt like a bourgeois "Wheres Wally?' },
        { title: 'The Borghese Gladiator', text: 'The woman in the middle is so beautifully lit, painted in oil, looking almost like a statue.' },
        { title: 'Ugolino and His Sons Jean Baptiste Carpeaux', text: 'In awe of the detail carved in the marble makes you forget its literally just a rock and not actual muscle.' },
        { title: 'Washington Crossing the Delaware Emanuel Leutze', text: 'The sheer size of the painting humbled me. It felt as if the waves were about to swallow me.' },
       { title:  'The Dead Christ with Angels Édouard Manet', text: 'Im not religious but seeing Christs cadavarous body deeply moved me.' },
        { title: 'Woman Having Her Hair Combed Edgar Degas', text: 'Girlhood. Not always glamourous or flattering but everlasting. I see my mum and I.' },
        { title: 'Diana Augustus Saint-Gaudens', text: 'Light hits her body in the most beautiful way. If angels are real Id like to think they do look like her.' },
    ],
    'swingby': [
        { title: 'Dance in a Subterranean Roundhouse Jules Tavernier', text: ' Feels morally confusing to look at. It begs the question is this Native American appreciation or exploitation.' },
        { title: 'Madame X (Virginie Amélie Avegno Gautreau) John Singer Sargent', text: 'A little black dress. Timeless.' },
        { title: 'Self-Portrait with a Straw Hat Vincent van Gogh', text: 'Slightly overrated. Nevertheless cool to see in real life. Its double sided!' },
       { title: 'The Deluge Valentin Bousch', text: 'One of many stained glass pieces, but so impressive that facial expression is conveyed on a literal window.'},
        { title: 'An Eruption of Vesuvius Johan Christian Dahl', text: 'So impressive. Honestly could be mistaken for a photograph.' },
         { title: 'The Old Courtesan (La Belle qui fut heaulmière) Auguste Rodin', text: 'Inspired body neutrality in me. Reminder that no matter how much we critique our bodies nothing can stop the ravages of time.' },
      
    ],
    'skip': [
      { title: 'Irises Vincent van Gogh', text: 'Pretty but very ordinary. Essentially a 19th century Windows screensaver. ' },
       { title: 'A Gorge in the Mountains Kauterskill Sanford Robinson Gifford', text: 'So many painting look just like this. They all blend into one another.' },
        { title: 'Samuel Verplanck John Singleton Copley', text: 'Another portrait of a white man. Boring.' },
        { title: 'Skeleton Astride a Skull Rantei', text: 'Strange and morbid. Unimpressive sculpting and size.' },
        { title: 'Daniel Crommelin Verplanck John Singleton Copley', text: 'Proportions are so off its uncomfortable to look at.' },
        { title: 'The Night-Hag Visiting Lapland Witches Henry Fuseli', text: 'Weird not in a good way. Nightmare fuel.' },
       
    ]
};

async function findObjectId(title) {

    const url = `https://collectionapi.metmuseum.org/public/collection/v1.1/search?q=${encodeURIComponent(title)}&hasImages=true`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.objectIDs ? data.objectIDs[0] : null;
    } catch (error) {
        console.log(" Object not present");
        return null;
    }
}

async function findObjectDetails(id) 
{
 try {
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        return await res.json();
    } catch (error) {
        console.log("Object details not present");
        return null;
    }
}


function buildObjectCard(obj, customText) {
    return `
        <div class="artwork">
            <img 
                src="${obj.primaryImageSmall || obj.primaryImage}" 
                alt="${obj.title}"
                data-custom-text="${customText}"
                onerror="this.style.display='none';"
            >
            <p>${obj.title}<br>${obj.artistDisplayName || 'Unknown'}</p>
        </div>
    `;
}

async function loadArtworks() {
  
    const gallery = document.getElementById('gallery');
    if (!gallery) return; 

    const currentPage = window.location.pathname;
    let targetArtworks = [];

    if (currentPage.includes('mustsee')) targetArtworks = artworksData['mustsee']; 
    else if (currentPage.includes('swingby')) targetArtworks = artworksData['swingby']; 
    else if (currentPage.includes('skip')) targetArtworks = artworksData['skip']; 
    else return; 


    try {
        
    const ids = await Promise.all(targetArtworks.map(item => findObjectId(item.title)));
        
        
    const validIds = ids.filter(id => id !== null);
        if (validIds.length === 0) {
            showErrorState(gallery);
            return; 
        }
 
    const details = await Promise.all(validIds.map(findObjectDetails)
      
  );

   
   const htmlString = details
      .filter(obj => obj !== null)
      .map((obj, index) => buildObjectCard(obj, targetArtworks[index].text ))
      .join('');

    gallery.innerHTML = htmlString;
                        
    } catch (error) {showErrorState(gallery);
        console.log("API Error");
    }
}


function showErrorState(galleryElement) {
    galleryElement.innerHTML = `
        <div class="error-state">
            <h2>Art block! Try again.</h2>
            <button onclick="window.location.reload()">Retry</button>
        </div>
    `;
}

loadArtworks();


// lightbox
function initLightbox() {
    
    const gallery = document.getElementById('gallery');
    if (!gallery) return; 

    console.log('Lightbox present');

    const lightboxBack = document.createElement('div');
    lightboxBack.id = "lightboxBack";
    document.body.appendChild(lightboxBack);

    
    const images = document.querySelectorAll('.artwork img');
    images.forEach(image => {image.addEventListener('click', e => {
        lightboxBack.classList.add('active');
        const lightboxImg = document.createElement('img');
          
      lightboxImg.src = image.src; 
      lightboxImg.id = "lightboxImg";

    const lightboxText = document.createElement('p');
    lightboxText.id = "lightboxText";

         lightboxText.innerHTML = image.getAttribute('data-custom-text'); 
     
        while (lightboxBack.firstChild) { 
        lightboxBack.removeChild(lightboxBack.firstChild);}
        lightboxBack.appendChild(lightboxImg);
        lightboxBack.appendChild(lightboxText); 
    })
  });

    lightboxBack.addEventListener('click', e => 
        { lightboxBack.classList.remove('active'); 
    });
}

// scrollbar
function initScrollbar() {
    
   if (!window.gsap || !window.ScrollTrigger) {
    console.log('ScrollTrigger/GSAP not present');
    return; }

    gsap.registerPlugin(ScrollTrigger);
    
    const circle = document.querySelector(".circle");
    const line = document.querySelector(".line");

    if (circle && line) {
        const maxTravelDistance = line.offsetHeight - circle.offsetHeight;
        const travelDistance = Math.max(0, maxTravelDistance); 

        gsap.to(circle, {
            y: travelDistance,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true 
            }
        });
        console.log("Scrollbar is present and working");
    }
}


async function initPage() {
  try{ 
    
    
    await loadArtworks();
    
    
    initLightbox();
    
    
    initScrollbar();
}catch(error){
  console.log('Failed during loading')
}
}
initPage();