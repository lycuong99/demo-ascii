import gsap from "gsap";

export const gsapLoader = (e) => {
  console.log("loader", e.request.url, window.location.href);
  if(window.location.href === e.request.url) {
    return ()=>{}
  }
  return gsap.to("main", { opacity: 0, duration: 0.5 });
};
