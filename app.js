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
