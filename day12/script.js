gsap.registerPlugin(ScrollTrigger);

// Smooth scrolling with Lenis. Unlike Locomotive Scroll it keeps native scroll,
// so ScrollTrigger needs no scrollerProxy and pinning uses cheap position: fixed.
function smoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
smoothScroll();


// Play videos only while they're on screen instead of decoding all of them at once.
function lazyVideos() {
  const videos = document.querySelectorAll("video[data-autoplay]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { rootMargin: "100px 0px" });

  videos.forEach((video) => observer.observe(video));
}
lazyVideos();


gsap.to("#page>video", {
  scrollTrigger: {
    trigger: "#page>video",
    start: "2% top",
    end: "bottom top",
  },
  onStart: () => {
    document.querySelector("#page>video").play();
  },
});

gsap.to("#page", {
  scrollTrigger: {
    trigger: "#page",
    start: "top top",
    end: "bottom top",
    pin: true,
  },
});

gsap.to("#page-bottom", {
  scrollTrigger: {
    trigger: "#page-bottom",
    start: "5% top",
    end: "bottom top",
    scrub: 0.5,
  },
  opacity: 0,
});

gsap.timeline({
  scrollTrigger: {
    trigger: "#page2",
    start: "top top",
    scrub: 1,
    pin: true,
  },
}).to("#page2>h1", { top: "-50%" });

gsap.timeline({
  scrollTrigger: {
    trigger: "#page4",
    start: "top top",
    scrub: 1,
    pin: true,
  },
}).to("#page4>#center-page4", { top: "-50%" });


// Scroll-driven image sequence drawn on a canvas.
// Frames load only when the section gets close, and the canvas redraws
// only when the frame actually changes.
function imageSequence({ canvas, trigger, urls, end, fit }) {
  const context = canvas.getContext("2d");
  const images = new Array(urls.length);
  const state = { frame: 0 };
  let drawnFrame = -1;
  let loadingStarted = false;

  function loadFrame(i) {
    const img = new Image();
    img.decoding = "async";
    img.src = urls[i];
    img.onload = () => {
      if (i === state.frame || drawnFrame === -1) render(true);
    };
    images[i] = img;
  }

  function loadAll() {
    if (loadingStarted) return;
    loadingStarted = true;
    for (let i = 1; i < urls.length; i++) loadFrame(i);
  }

  // Closest frame that has finished loading, so fast scrolling never shows a blank canvas.
  function readyImage(index) {
    for (let offset = 0; offset < urls.length; offset++) {
      const before = images[index - offset];
      if (before && before.complete && before.naturalWidth) return before;
      const after = images[index + offset];
      if (after && after.complete && after.naturalWidth) return after;
    }
    return null;
  }

  function render(force) {
    const frame = Math.round(state.frame);
    if (!force && frame === drawnFrame) return;

    const img = readyImage(frame);
    if (!img) return;
    drawnFrame = frame;

    const { width, height } = canvas;
    const hRatio = width / img.naturalWidth;
    const vRatio = height / img.naturalHeight;
    const ratio = fit === "cover" ? Math.max(hRatio, vRatio) : Math.min(hRatio, vRatio);
    const w = img.naturalWidth * ratio;
    const h = img.naturalHeight * ratio;

    context.clearRect(0, 0, width, height);
    context.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    render(true);
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  loadFrame(0);
  resize();

  ScrollTrigger.create({
    trigger,
    start: "top bottom+=150%",
    onEnter: loadAll,
    onEnterBack: loadAll,
    onLeave: loadAll,
  });

  gsap.to(state, {
    frame: urls.length - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top top",
      end,
      scrub: 0.15,
      pin: true,
    },
    onUpdate: () => render(false),
  });
}

const visionProBase =
  "https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/";

imageSequence({
  canvas: document.querySelector("#page7>canvas"),
  trigger: "#page7>canvas",
  urls: Array.from({ length: 198 }, (_, i) => `${visionProBase}${String(i).padStart(4, "0")}.jpg`),
  end: "600% top",
  fit: "contain",
});

imageSequence({
  canvas: document.querySelector("#page18>canvas"),
  trigger: "#page18",
  urls: Array.from({ length: 25 }, (_, i) => `./Apple vision canvas images/Vision${String(i + 1).padStart(5, "0")}.webp`),
  end: "80% top",
  fit: "cover",
});


gsap.timeline({
  scrollTrigger: {
    trigger: "#page21",
    start: "top top",
    scrub: 1,
    pin: true,
  },
}).to("#page21>#troff", { opacity: 0 });

gsap.timeline({
  scrollTrigger: {
    trigger: "#page22",
    start: "top top",
    scrub: 1,
    pin: true,
  },
}).to("#page22>#snroff", { opacity: 0 });

gsap.to("#page23>img", {
  scrollTrigger: {
    trigger: "#page23>img",
    start: "top bottom",
    end: "bottom 60%",
    scrub: 0.5,
  },
  opacity: 1,
});

// Images above lazy-load and change page height; re-measure once everything is in.
window.addEventListener("load", () => ScrollTrigger.refresh());
