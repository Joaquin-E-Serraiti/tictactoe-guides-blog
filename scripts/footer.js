function createFooter() {
  let footer = document.createElement("footer");
  let footerNav = document.createElement("nav");
  let section2 = document.createElement("section");
  let section3 = document.createElement("section");

  let footerShadow = document.createElement("div");
  let footerLogo = document.createElement("img");
  let copyNotice = document.createElement("p");

  footerShadow.id = "footerBottomShadow";
  footerLogo.src = "assets(2)/Logo-10.svg";
  footerLogo.alt = "Logo Tictactoe Guides";
  footerLogo.height = "33";
  footerLogo.width = "100";
  copyNotice.id = "copyrightNotice";
  copyNotice.innerHTML = "&copy; 2024 Tictactoe Guides.";

  footerNav.className = "footerNavLinks";
  
  section2.id = "footerNav2";
  section2.innerHTML = `
  <h2>Browse</h2>
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="blogArticles.html">Blog</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>`
  section3.id = "footerNav3";
  section3.innerHTML = `
  <h2>Recommended articles</h2>
    <ul class="recommendedArticles">
      <li>
        <a href="article-1.html">All possible combinations of plays in Tictactoe</a>
      </li>
    </ul>`

  footer.appendChild(footerShadow);
  footer.appendChild(footerLogo);
  if (document.URL.includes("index.html")) {
    let section1 = document.createElement("section");
    section1.id = "footerNav1";
    section1.innerHTML = `
    <h2>Home page sections</h2>
    <ul>
      <li><a href="#section2">Rules of the game</a></li>
      <li><a href="#section3">What you will find in the blog</a></li>
      <li><a href="#section4">Not sure where to start reading?</a></li>
    </ul>`
    footerNav.appendChild(section1)
  }
  footerNav.appendChild(section2);
  footerNav.appendChild(section3);
  footer.appendChild(footerNav);
  footer.appendChild(copyNotice);
  document.body.appendChild(footer);
}

createFooter()