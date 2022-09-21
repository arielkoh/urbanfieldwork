function initPage() {
  /* start the animate on scroll library */
  AOS.init({
    duration: 500,
  });
  registerPageTransition();
  initHamburgerMenu();
}

/* register Page transition */
function registerPageTransition() {
  window.onload = () => {
    const anchors = document.querySelectorAll("a");
    const transition_el = document.querySelector(".transition");

    setTimeout(() => {
      transition_el.classList.remove("is-active");
    }, 500);

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const isTarget =
        (anchor.attributes.getNamedItem("target") + "").substring(0, 4) !==
        "null";
      if (!isTarget) {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          let target = e.target.href;

          transition_el.classList.add("is-active");

          setInterval(() => {
            window.location.href = target;
          }, 500);
        });
      }
    }
  };
}

function initHamburgerMenu() {
  /* initialise Hamburger-Menu */
  const hamburger = document.querySelector(".main-nav__ham");
  const navMenu = document.querySelector(".main-nav__list");
  const navLink = document.querySelectorAll(".main-nav__item");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
}

/*
 * Image Slider using the Splide library
 * https://splidejs.com/options/
 *
 */
function addSplideImageSliderFor(theSelector) {
  document.addEventListener("DOMContentLoaded", function () {
    new Splide("#" + theSelector, {
      type: "loop",
      gap: "2rem",
      start: 0,
      accessibility: false,
      perPage: 2,
      pagination: true,
      breakpoints: {
        1024: {
          perPage: 1,
        },
      },
    }).mount();
  });
}

/* provide parent div id and class name
 * call function from html document when needed.
 */
function dragImages(theContainer, theClassName) {
  let listOfImages = document.getElementsByClassName(theClassName);
  let n = 0;
  for (const el of listOfImages) {
    let w = window.innerWidth;
    let h = window.innerHeight;

    let iw = Math.round(window.innerWidth * 0.4);
    iw = iw < 300 ? 300 : iw;

    let nx = Math.round(getRandomFromRange(-1, 1) * 20) * 10;
    let ny = Math.round(getRandomFromRange(-1, 1) * 20) * 10;
    let x = w / 2 - iw / 2 + nx;
    let y = h / 2 - iw / 2 + ny;

    let s = `"${x}px"`;
    el.style.position = "absolute";
    el.style.width = iw + "px";
    el.style.top = y + "px";
    el.style.left = x + "px";
    el.id = "random-image-" + n++;
  }

  let container = document.querySelector("#" + theContainer);

  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);

  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mousemove", drag, false);

  let active = false;
  let origin = {};

  function dragStart(e) {
    if (e.target.classList.value.includes("drag-me")) {
      dragItem = e.target.id;

      if (!(dragItem in origin)) {
        origin[dragItem] = { x: 0, y: 0, cx: 0, cy: 0, ox: 0, oy: 0 };
      }

      let o = origin[dragItem];
      let b = e.type === "touchstart";

      o.x = b ? e.touches[0].clientX - o.ox : e.clientX - o.ox;
      o.y = b ? e.touches[0].clientY - o.oy : e.clientY - o.oy;

      active = true;
    }
  }

  function dragEnd(e) {
    let o = origin[dragItem];
    o.x = o.cx;
    o.y = o.cy;
    active = false;
  }

  function drag(e) {
    if (active) {
      e.preventDefault();
      let o = origin[dragItem];
      let b = e.type === "touchmove";

      o.cx = b ? e.touches[0].clientX - o.x : e.clientX - o.x;
      o.cy = b ? e.touches[0].clientY - o.y : e.clientY - o.y;

      o.ox = o.cx;
      o.oy = o.cy;

      document.querySelector("#" + dragItem).style.transform =
        "translate3d(" + o.ox + "px, " + o.oy + "px, 0)";
    }
  }
}
/* Helper function to generate random numbers within a specified range */
function getRandomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}

/* now that all functions are know, lets init the
 * Page by calling function initPage()
 */
initPage();
