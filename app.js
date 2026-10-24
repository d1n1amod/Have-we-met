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
  
  const isHomePage = window.location.pathname === '/' || window.location.pathname.includes('index');

  if (header) 
    { 
      header.insertAdjacentHTML('afterend', navHTML);
      
      if (isHomePage) 
    {
      const homeBtn = document.querySelector('.home-link');
      if (homeBtn) homeBtn.style.display = 'none';

      console.log('Navigation present');
    } 
  }
   else {

    console.log('Header not found');
}
}

loadNavigation();
