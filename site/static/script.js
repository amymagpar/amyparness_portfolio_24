// Get the button
const mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls, handle button visibility and animation
const scrollFunction = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const totalHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const scrolledHeight = window.scrollY;
  const scrolledToBottom = viewportHeight + scrolledHeight >= totalHeight - 50;

  // At the top (first 20px)
  if (scrollTop <= 20) {
    mybutton.classList.add("animate-reverse");
    mybutton.classList.add("hidden");
    mybutton.classList.remove("!animate-bounce");
    mybutton.classList.remove("!bg-accent");
  }
  // At the bottom
  else if (scrolledToBottom) {
    mybutton.classList.remove("animate-reverse");
    mybutton.classList.remove("hidden");
    mybutton.classList.add("!animate-bounce");
    mybutton.classList.add("!bg-accent");
  }
  // In between
  else {
    mybutton.classList.remove("animate-reverse");
    mybutton.classList.remove("hidden");
    mybutton.classList.remove("!animate-bounce");
    mybutton.classList.remove("!bg-accent");
  }
};
const backToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

window.addEventListener("scroll", scrollFunction);

// hiding main nav

let throttling = false;

function onScrollThrottled() {
  if (!throttling) {
    throttling = true;
    requestAnimationFrame(() => {
      onScroll();
      throttling = false;
    });
  }
}

let navbarTop = 0;
let transition = true;
let position = "absolute";
let lastScrollPosition = 0;

const navbar = document.getElementById("navbar");

// start mobile menu hide
const mobileMenu = document.getElementById("myTopnav");

function onScroll() {
  const currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollPosition <= 0) {
    lastScrollPosition = 0;
    navbarTop = 0;

    if (position !== "absolute") {
      transition = true;
    } else {
      transition = false;
    }
    position = "absolute";
  } else {
    if (currentScrollPosition > lastScrollPosition) {
      mobileMenu.classList.add("hidden", "topnav");

      if (position !== "absolute") {
        transition = true;
      } else {
        transition = false;
      }
      position = "absolute";

      let { top, height } = navbar.getBoundingClientRect();
      navbarTop = currentScrollPosition + Math.max(top, -height);
    } else {
      const { top } = navbar.getBoundingClientRect();

      if (top >= 0) {
        navbarTop = 0;

        if (position !== "fixed") {
          transition = true;
        } else {
          transition = false;
        }
        position = "fixed";
      }
    }

    lastScrollPosition = currentScrollPosition;
  }
  navbar.style = `position: ${position}; top: ${navbarTop}px; transition: ${transition ? "none" : "300ms linear"}`;
}
window.addEventListener("scroll", onScrollThrottled, { passive: true });
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function responsiveNav() {
  var x = document.getElementById("myTopnav");
  if (x.classList.contains("topnav")) {
   x.classList.remove("max-h-0", "topnav","pb-0");
   x.classList.add("border","max-h-screen","pb-6");
 } else {
    x.classList.add("max-h-0","topnav","pb-0");
       x.classList.remove("border","max-h-screen","pb-6");
 }
}
// scroll animation https://alvarotrigo.com/blog/css-animations-scroll/
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

reveal();
// To check the scroll position on page load
// END scroll animation https://alvarotrigo.com/blog/css-animations-scroll/
