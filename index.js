const loginMenu = document.querySelector("header .active");
const loginShow = document.querySelector(".login_container");
const btnClose = document.querySelector("#btn_close");
loginMenu.addEventListener("click", () => {
  loginShow.style.clipPath = `circle(100% at 50% 50%)`;
});
btnClose.addEventListener("click", () => {
  loginShow.style.clipPath = `circle(0 at 50% 50%)`;
});

const btnToggle = document.querySelectorAll(".next_log");
const resForm = document.querySelector("#res");
btnToggle.forEach((item) => {
  item.addEventListener("click", () => {
    resForm.classList.toggle("hidden");
  });
});

// Menu Toggle --------------------
const menuToggle = document.querySelectorAll("header .menu");
const menu = document.querySelector("header ul");
menuToggle.forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.toggle("menu_toggle");
  });
});

// Banner Auto Slide --------------------
const banner = document.querySelector(".banner");
const images = document.querySelectorAll(".banner img");
const dots = document.querySelectorAll(".banner .nav_dot");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let slideIndex = 0;
slideShow(slideIndex);
function slideShow(n) {
  if (slideIndex > images.length - 1) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = images.length - 1;
  }
  for (let i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot_active", "");
  }

  images[slideIndex].style.display = "block";
  dots[slideIndex].className += " dot_active";
}
dots.forEach((item, index) => {
  item.addEventListener("click", () => {
    slideShow((slideIndex = index));
  });
});
prev.addEventListener("click", () => {
  slideShow((slideIndex -= 1));
});
next.addEventListener("click", () => {
  slideShow((slideIndex += 1));
});

let run;
autoSlide();
function autoSlide() {
  run = setInterval(() => {
    slideShow((slideIndex += 1));
  }, 2000);
}
banner.addEventListener("mouseover", () => {
  clearInterval(run);
  run = null;
});
banner.addEventListener("mouseout", () => {
  autoSlide();
});
// Lazy Load Optimizer --------------------
document.addEventListener("DOMContentLoaded", () => {
  let lazyLoaderImages = document.querySelectorAll("img.lazy");
  let lazyloaderThrottleTimeout;
  lazyLoaderImages.forEach((img) => {
    img.style.transform = `scale(0.7)`;
  });
  function lazyload() {
    if (lazyloaderThrottleTimeout) {
      clearTimeout(lazyloaderThrottleTimeout);
    }
    lazyloaderThrottleTimeout = setTimeout(() => {
      let scrollTop = window.pageYOffset;
      lazyLoaderImages.forEach((img) => {
        if (img.offsetTop < window.innerHeight + scrollTop) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          img.style.transform = `scale(1)`;
          img.style.transition = `2s`;
        }
      });
      if ((lazyLoaderImages.length = 0)) {
        document.removeEventListener("scroll", lazyload);
        document.removeEventListener("resize", lazyload);
        document.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }
  document.addEventListener("scroll", lazyload);
  document.addEventListener("resize", lazyload);
  document.addEventListener("orientationChange", lazyload);
});
