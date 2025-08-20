function createHeader() {
  let header = document.createElement("header");
  let navBar = document.createElement("nav");
  let logoLink = document.createElement("a");
  let logoImg = document.createElement("img");
  let linksList = document.createElement("ul");
  let hamburgerButton = document.createElement("div");
  let hamburgerClose = document.createElement("div");
  let mobileNavLinks = document.createElement("nav");
  let hamburgerMenu = document.createElement("div");
  let menuDark = document.createElement("div");
  
  menuDark.id = "menuDark";
  hamburgerButton.className = "hamburgerButton";
  hamburgerButton.onclick = mobileMenuOpen;
  hamburgerButton.innerHTML = `
  <div></div>
  <div></div>
  <div></div>`
  
  hamburgerClose.className = "closeButton";
  hamburgerClose.onclick = mobileMenuClose;
  hamburgerClose.innerHTML = "<p>&#10006;</p>";

  mobileNavLinks.innerHTML = `
  <ul>
    <li><a href="index.html">HOME</a></li>
    <li><a href="blogArticles.html">BLOG</a></li>
    <li><a href="about.html">ABOUT</a></li>
    <li><a href="contact.html">CONTACT</a></li>
  </ul>`
  hamburgerMenu.className = "hamburgerMenu";

  header.id="primaryNav";
  navBar.className =`navBar ${document.URL.includes("index.html") ? "" : "navClass2"}`.trim();

  logoImg.src = "assets(2)/Logo-10.svg";
  logoImg.alt = "Logo Tictactoe Guides";
  logoImg.height = "33";
  logoImg.width = "100";
  logoLink.appendChild(logoImg);
  logoLink.id="logoLink";
  logoLink.href ="index.html"

  linksList.innerHTML = `
  <li><a href="index.html">HOME</a></li>
  <li><a href="about.html">ABOUT</a></li>
  <li><a href="contact.html">CONTACT</a></li>
  <li id="blogNavBarLink"><a href="blogArticles.html">BLOG</a></li>`

  navBar.appendChild(menuDark);
  hamburgerMenu.appendChild(hamburgerClose)
  hamburgerMenu.appendChild(mobileNavLinks);
  navBar.appendChild(logoLink);
  navBar.appendChild(hamburgerButton);
  navBar.appendChild(linksList);
  header.appendChild(navBar);
  header.appendChild(hamburgerMenu);
  document.body.appendChild(header);
}

function mobileMenuOpen(){
  document.querySelector(".hamburgerMenu").style.display = "initial";
  document.querySelector("#menuDark").style.display = "initial";
}
function mobileMenuClose(){
  document.querySelector(".hamburgerMenu").style.display = "none";
  document.querySelector("#menuDark").style.display = "none";
}

createHeader()