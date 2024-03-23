const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});
const circle = document.querySelector("#mini-circle");

let timeout;
function circlechaptakro() {
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    var xdif = dets.clientX - xprev;
    var ydif = dets.clientY - yprev;

    // console.log(xdif,ydif);
    var xscale = gsap.utils.clamp(0.8, 1.2, xdif);
    var yscale = gsap.utils.clamp(0.8, 1.2, ydif);
    console.log(xscale, yscale);
    xprev = dets.clientX;
    yprev = dets.clientY;
    followcircle(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector(
        "#mini-circle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

circlechaptakro();

function followcircle(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    // console.log(dets);
    document.querySelector(
      "#mini-circle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}
followcircle();

(function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1,
    ease: Expo.easeInOut,
  })

    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 1,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1,
      delay: -0.5,
      ease: Expo.easeInOut,
    });
})();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mouseleave", function (dets) {
    var circle = document.querySelector("#mini-circle");
    circle.style.width = "10px";
    circle.style.height = "10px";
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
    gsap.to(elem.querySelector("h1,h6"), {
      marginLeft:-30,
      opacity:1,
      ease:Power3
    });
  });
  elem.addEventListener("mousemove", function (dets) {
    var circle = document.querySelector("#mini-circle");
    circle.style.width = "50px";
    circle.style.height = "50px";

    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    var diffY = dets.clientY - elem.getBoundingClientRect().top;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diffY,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8),
    });
    gsap.to(elem.querySelector("h1,h6"), {
      marginLeft:30,
      opacity:.5,
      ease:Power3
    });
  });
});
