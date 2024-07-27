/* eslint-disable react/prop-types */
import gsap from "gsap";
import { memo, useEffect, useLayoutEffect, useRef } from "react";
import Splitting from "splitting";
import { cn } from "../../lib/util";
import Button from "../../components/button";
import { Flip } from "gsap/Flip";
import { getRandomChar } from "../../utils";

class Line {}
gsap.registerPlugin(Flip);
class Cell {
  constructor({ el, position, value, char }) {
    this.el = el;
    this.position = position;
    this.value = value;
    this.char = char;
  }

  set(char) {
    this.el.innerHTML = char;
    this.char = char;
  }

  reset() {
    this.el.innerHTML = this.value;
  }
}

function createTextAnimation(intro) {
  const results = Splitting({
    target: intro,
    by: "lines",
  });

  console.log(results);
  results.forEach((s) => Splitting({ target: s.words }));

  const lines = results[0].lines.map((line, index) => {
    const words = line;
    const cells = words
      .flatMap((word, index) => {
        const chars = word.querySelectorAll(".char");

        return [...chars];
      })
      .map((char, index) => {
        return new Cell({
          el: char,
          position: index,
          value: char.textContent,
          char: char.textContent,
        });
      });

    return {
      position: index,
      el: line,
      cells: cells,
    };
  });

  const clear = () => {
    lines.forEach((line) => {
      line.cells.forEach((cell) => {
        cell.set("&nbsp;");
      });
    });
  };
  clear();

  const animate = () => {
    // intro.classList.remove("opacity-0");
    const MAX_CELL_ITERATION = 45;

    const loop = (line, cell, iteration = 0) => {
      const prev = cell.position === 0 ? 0 : cell.position - 1;

      cell.cache = cell.char;
      if (iteration === MAX_CELL_ITERATION - 1) {
        cell.reset();
      } else if (cell.position === 0) {
        const randomChar =
          iteration < 9 ? ["*", "-", "\u0027", "\u0022"][Math.floor(Math.random() * 4)] : getRandomChar();
        cell.set(randomChar);
      } else {
        // el.textContent = cache;
        cell.set(line.cells[prev].cache);
      }

      if (cell.cache != "&nbsp;") {
        ++iteration;
      }

      if (iteration < MAX_CELL_ITERATION) {
        setTimeout(() => {
          loop(line, cell, iteration);
        }, 16);
      }
    };
    lines.forEach((line, i) => {
      line.cells.forEach((cell) => {
        setTimeout(() => {
          loop(line, cell);
        }, (i + 1) * 200);
      });
    });
  };
  const reset = () => {
    lines.forEach((line) => {
      line.cells.forEach((cell) => {
        cell.reset();
      });
    });
  };
  return {
    clear,
    animate,
    reset,
  };
}

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
    function handleClickWindow(e){
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
          const charParentWidth = char.parentElement.offsetWidth * 3;
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
        <h1 ref={h1Ref} className="font-neu font-normal text-[70px] uppercase mb-6 h1-text pointer-events-none">
          <div className="text-linear-1 span-gradient">Building The </div>{" "}
          <span className="text-linear-2 span-gradient">Biggest Decentralized</span>{" "}
          <span className="font-bold"> </span>
          <div></div> <div className="font-bold text-linear-1 span-gradient">Data Warehouse</div>
        </h1>
        <p ref={introRef} className="anim text-[20px] text-[#FECE00] uppercase">
          Lorem ipsum dolor sit amet consectetur.
        </p>
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
          <span className="btn-text overflow-hidden absolute w-32 group-hover:text-[#FECE00]">GET ACCESS</span>
          <span className="btn-icon overflow-hidden inline-block h-4 w-4 border rounded-full border-[#FECE00] absolute"></span>
        </div>
      </Button>
    </section>
  );
};

const IntroMemo = memo(Intro);
IntroMemo.displayName = "Intro";
export default IntroMemo;
