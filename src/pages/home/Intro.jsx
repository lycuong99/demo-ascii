/* eslint-disable react/prop-types */
import gsap from "gsap";
import { memo, useLayoutEffect, useRef } from "react";
import Button from "../../components/button";
import { Flip } from "gsap/Flip";
import { H1, Subheader1 } from "@/components/typography";
import { createTextAnimation } from "@/animation";

gsap.registerPlugin(Flip);

const Intro = () => {
  console.log("hello");
  const introRef = useRef(null);
  const h1Ref = useRef(null);
  const btnIsAccessRef = useRef(false);

  useLayoutEffect(() => {
    console.log("bye");
    const intro = introRef.current;
    const h1 = h1Ref.current;
    // intro.classList.add("opacity-0");

    const { animate, clear, reset } = createTextAnimation(intro);
    const { animate: animate1, reset: reset1 } = createTextAnimation(h1);

    let timeout = setTimeout(() => {
      animate();
    }, 900);
    let timeout1 = setTimeout(() => {
      animate1();
    }, 300);

    function handleClick(e) {
      const btntext = document.querySelector(".btn-text");
      const btnicon = document.querySelector(".btn-icon");
      const btn = document.querySelector(".btn-wrapper");
      const btnE = document.querySelector(".flair");
      const state = Flip.getState(".btn-text, .btn-icon, .btn-wrapper, .flair");

      const isSmall = !btnIsAccessRef.current;
      gsap.to(btnE, {
        width: isSmall ? 160 : 64,

        // height: isSmall ? 64 : 64,
        ease: "power1.inOut",
        duration: 0.3,
      });
      gsap.to(btnicon, {
        y: isSmall ? 100 : 0,
        opacity: isSmall ? 0 : 1,
        ease: "power1.inOut",
        duration: 0.3,
      });
      gsap.to(btntext, {
        y: isSmall ? 0 : -100,
        opacity: isSmall ? 1 : 0,
        ease: "power1.inOut",
        duration: 0.3,
      });

      // btntext.classList.toggle("w-0");
      // btntext.classList.toggle("h-0");
      // btntext.classList.toggle("opacity-0");
      // // btntext.classList.toggle("hidden");

      // // btnicon.classList.toggle("hidden");
      // btnicon.classList.toggle("w-0");
      // btnicon.classList.toggle("h-0");
      // btnicon.classList.toggle("opacity-0");
      // // btnicon.classList.toggle("scale-0");

      // Flip.from(state, {
      //   targets: [btntext, btnicon, btn, btnE],
      //   duration: 0.3,

      //   // fade: true,
      //   absolute: true,
      //   // scale: true,
      //   nested: true,
      //   toggleClass: "flipping",
      //   ease: "power1.inOut",
      // });

      btnIsAccessRef.current = !btnIsAccessRef.current;
    }
    function handleClickWindow(e) {
      const btn = document.querySelector(".flair");
      btn.style.pointerEvents = "all";
      // btn.style.visibility = "hidden";
      let receiver = document.querySelector("main");
      if (document.elementsFromPoint(e.clientX, e.clientY).includes(btn)) {
        console.log("click");

        handleClick(e);
      }
      // receiver.dispatchEvent(new Event("mousemove"), { bubbles: false, cancelable: false });
      // btn.style.visibility = "visible";
      btn.style.pointerEvents = "none";
    }
    {
      gsap.set(".flair", { xPercent: -50, yPercent: -50 });

      let xTo = gsap.quickTo(".flair", "x", { duration: 0.6, ease: "power3" }),
        yTo = gsap.quickTo(".flair", "y", { duration: 0.6, ease: "power3" });

      window.addEventListener("mousemove", (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      });

      window.addEventListener("click", handleClickWindow);
    }

    (function fixTextLinearGradientWhenSplitting() {
      const spanGradients = document.querySelectorAll(".span-gradient > .words");

      const fixWordsLinearGradient = (spanGradient) => {
        const gradientChars = spanGradient.querySelectorAll(".word > *");

        let offset = 0;

        gradientChars.forEach(function (char, i) {
          //bua
          const charParentWidth = char.parentElement.offsetWidth * 5;
          char.style.backgroundSize = charParentWidth + "px 100%";

          offset += char.previousElementSibling?.offsetWidth || 0;

          char.style.backgroundPosition = charParentWidth - offset + "px 0%";
        });
      };
      spanGradients.forEach(fixWordsLinearGradient);
    })();

    const btntext = document.querySelector(".btn-text");
    gsap.set(btntext, { y: -100 });

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout1);
      // intro.classList.add("opacity-0");
      reset();
      reset1();
      window.removeEventListener("click", handleClickWindow);
    };
  }, []);

  function handleClick(e) {
    const btntext = document.querySelector(".btn-text");
    const btnicon = document.querySelector(".btn-icon");
    const btn = document.querySelector(".btn-wrapper");
    const btnE = document.querySelector(".flair");
    const state = Flip.getState(".btn-text, .btn-icon, .btn-wrapper, .flair");

    const isSmall = !btnIsAccessRef.current;
    gsap.to(btnE, {
      width: isSmall ? 160 : 64,

      // height: isSmall ? 64 : 64,
      ease: "power1.inOut",
      duration: 0.3,
    });
    gsap.to(btnicon, {
      y: isSmall ? 100 : 0,
      opacity: isSmall ? 0 : 1,
      ease: "power1.inOut",
      duration: 0.3,
    });
    gsap.to(btntext, {
      y: isSmall ? 0 : -100,
      opacity: isSmall ? 1 : 0,
      ease: "power1.inOut",
      duration: 0.3,
    });

    // btntext.classList.toggle("w-0");
    // btntext.classList.toggle("h-0");
    // btntext.classList.toggle("opacity-0");
    // // btntext.classList.toggle("hidden");

    // // btnicon.classList.toggle("hidden");
    // btnicon.classList.toggle("w-0");
    // btnicon.classList.toggle("h-0");
    // btnicon.classList.toggle("opacity-0");
    // // btnicon.classList.toggle("scale-0");

    // Flip.from(state, {
    //   targets: [btntext, btnicon, btn, btnE],
    //   duration: 0.3,

    //   // fade: true,
    //   absolute: true,
    //   // scale: true,
    //   nested: true,
    //   toggleClass: "flipping",
    //   ease: "power1.inOut",
    // });

    btnIsAccessRef.current = !btnIsAccessRef.current;
  }

  function hanleMouseBtn(e) {
    //pass event through canvas when hover on this button
    const btn = document.querySelector(".flair");
    btn.classList.remove("pointer-events-none");
    btn.style.visibility = "hidden";
    let receiver = document.querySelector("main");
    console.log(document.elementFromPoint(e.clientX, e.clientY));
    receiver.dispatchEvent(new Event("mousemove"), { bubbles: true, cancelable: false });
    btn.style.visibility = "visible";
    btn.classList.add("pointer-events-none");
  }

  return (
    <section
      className="flex flex-col justify-end h-full pb-20 pointer-events-none"
      style={{
        zIndex: 10,
        position: "relative",
      }}
    >
      <div className="container font-neu flex flex-col items-start justify-center">
        <H1 ref={h1Ref} className="hidden lg:block mb-6 pointer-events-none">
          <pre>
            <div className="text-linear-1 span-gradient">Building The </div>{" "}
            <span className="text-linear-2 span-gradient">Biggest Decentralized</span>{" "}
            <div className="font-bold text-linear-1 span-gradient">Data Protocol</div>
          </pre>
        </H1>
        <H1 className="block lg:hidden mb-6 pointer-events-none">
          <pre>
            <div className="text-linear-1 span-gradient">Building The </div>
            <span className="text-linear-2 span-gradient">Biggest Decentralized</span>{" "}
            <div className="font-bold text-linear-1 span-gradient">Data Protocol</div>
          </pre>
        </H1>
        <Subheader1 as="pre" ref={introRef} className="hidden lg:block anim text-[14px] lg:text-[20px] text-[#FECE00] uppercase ">
          <span className="block">Join the movement towards a decentralized future </span>
          <span className="block">where your data is securely stored, easily accessible, </span>
          <span className="block">and entirely under your control.</span>
        </Subheader1>
        <Subheader1 className="block lg:hidden text-[14px] lg:text-[20px] max-w-[40ch]  text-[#FECE00] uppercase text-balance ">
          Join the movement towards a decentralized future where your data is securely stored, easily accessible, and
          entirely under your control.
        </Subheader1>
      </div>
      <Button
        className="bg-transparent flair absolute top-0 left-0 font-bold h-16 group "
        // onClick={handleClick}
        // onMouseOver={hanleMouseBtn}
        // onMouseEnter={hanleMouseBtn}
        // onMouseDown={hanleMouseBtn}
        // onMouseUp={hanleMouseBtn}
        // onMouseMove={hanleMouseBtn}
      >
        <div className="flex items-center justify-center btn-wrapper relative po">
          <span className="btn-text overflow-hidden absolute w-32 text-[#FECE00]">GET ACCESS</span>
          <span className="btn-icon overflow-hidden inline-block h-4 w-4 border rounded-full border-[#FECE00] absolute"></span>
        </div>
      </Button>
    </section>
  );
};

const IntroMemo = memo(Intro);
IntroMemo.displayName = "Intro";
export default IntroMemo;
