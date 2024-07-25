/* eslint-disable react/prop-types */
import gsap from "gsap";
import { memo, useEffect, useLayoutEffect, useRef } from "react";
import Splitting from "splitting";
import { cn } from "./lib/util";
import Button from "./components/button";

class Line {}

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
const lettersAndSymbols = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "!",
  "@",
  "#",
  "$",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "+",
  "=",
  "/",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "<",
  ">",
  ",",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

function getRandomChar() {
  return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
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
    {
      gsap.set(".flair", { xPercent: -50, yPercent: -50 });

      let xTo = gsap.quickTo(".flair", "x", { duration: 0.6, ease: "power3" }),
        yTo = gsap.quickTo(".flair", "y", { duration: 0.6, ease: "power3" });

      window.addEventListener("mousemove", (e) => {
        xTo(e.clientX - document.querySelector(".flair").offsetWidth / 2);
        yTo(e.clientY);
      });
    }
    {
      const spanGradients = document.querySelectorAll(".span-gradient > .words");
      spanGradients.forEach((spanGradient) => {
        const gradientChars = spanGradient.querySelectorAll(".word > *");

        let offset = 0;

        gradientChars.forEach(function (char, i) {
          //bua
          const charParentWidth = char.parentElement.offsetWidth * 3;
          char.style.backgroundSize = charParentWidth + "px 100%";

          offset += char.previousElementSibling?.offsetWidth || 0;

          char.style.backgroundPosition = charParentWidth - offset + "px 0%";

          // console.log(char.parentElement.offsetWidth, offset);
        });
      });
    }

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout1);
      // intro.classList.add("opacity-0");
      reset();
      reset1();
    };
  }, []);

  return (
    <section
      className="container flex flex-col justify-end h-full pb-20"
      style={{
        zIndex: 10,
        position: "relative",
      }}
    >
      <div className="container font-neu flex flex-col items-start justify-center">
        <h1 ref={h1Ref} className="font-neu font-normal text-[70px] uppercase mb-6 h1-text">
          <div className="text-linear-1 span-gradient">The Biggest</div>{" "}
          <span className="text-linear-2 span-gradient">Decentralized</span> <span className="font-bold">Data</span>
          <div></div> <div className="font-bold text-linear-1 span-gradient">Warehouse.</div>
        </h1>
        <p ref={introRef} className="anim text-[20px] text-[#FECE00] uppercase">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>
      <Button className="bg-transparent flair absolute top-0 left-0 font-bold">GET ACCESS</Button>
    </section>
  );
};

const IntroMemo = memo(Intro);
IntroMemo.displayName = "Intro";
export default IntroMemo;
