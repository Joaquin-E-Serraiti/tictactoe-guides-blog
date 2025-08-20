
if (document.URL.includes("index.html")) {
  let backgroundImg = document.querySelector("#heroSection img");
  let backgroundImgHeight = backgroundImg.clientHeight;
  let navbar = document.querySelector(".navBar");
  let interruptor = true;

    document.addEventListener("scroll", function () {
      let scrollPostion = window.scrollY;
      
      if (scrollPostion < backgroundImgHeight) {
        //console.log("on sight");
        backgroundImg.style.top = scrollPostion*0.7 + "px"
      };
      if (!interruptor && scrollPostion < 35) {
        interruptor = true;
        navbar.style.backgroundColor = "rgba(11,1,28,0)";
        //console.log("0");
      } else if (interruptor && scrollPostion >= 35) {
        navbar.style.backgroundColor = "rgba(11,1,28,1)";
        interruptor = false;
        //console.log("1");
      }
  })
}

