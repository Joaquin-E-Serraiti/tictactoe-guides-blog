function callback(entries, observer) {
  entries.forEach(entry => {
    if(entry.isIntersecting) {

      let scriptElem = document.createElement("script");
      scriptElem.src =
        "https://unpkg.com/commentbox.io/dist/commentBox.min.js";
      document.querySelector(".commentSection").appendChild(scriptElem);

      setTimeout(() => {
        commentBox("5762544761307136-proj", {
          backgroundColor: "rgb(35, 31, 46)",
          textColor: "#fff",
        });
      }, 1600);

      console.log('Element is in view!');

      // Stop observing the element
      observer.unobserve(entry.target);
    }
  });
}

let options = {
  root: null, // uses the viewport as the bounding box
  rootMargin: '0px', // no margin
  threshold: 0.0001 // trigger when at least 10% of the element is visible
};

// Creating an instance of IntersectionObserver
let observer = new IntersectionObserver(callback, options);

let target = document.querySelector(".observedPoint");
observer.observe(target);