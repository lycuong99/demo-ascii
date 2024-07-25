import { memo, useEffect, useLayoutEffect, useRef } from "react";
import Splitting from "splitting";

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
const Intro = () => {
  console.log("hello");
  const introRef = useRef(null);
  useLayoutEffect(() => {
    console.log("bye");
    const intro = introRef.current;
    // intro.classList.add("opacity-0");

    const results = Splitting({
      target: intro,
      by: "lines",
    });
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

      console.table(cells);

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

    const animate1 = () => {
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
          prev === 32 && console.log(prev, cell.cache);
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

    const animate2 = () => {
      const MAX_CELL_ITERATION = 45;

      const loop = (line, cell, iteration = 0) => {
        const el = cell.el;
        const prev = cell.position === 0 ? 0 : cell.position - 1;

        cell.cache = cell.char;
        if (iteration === MAX_CELL_ITERATION - 1) {
          cell.reset();
        } else if (cell.position === 0) {
          cell.set(["*", ":"][Math.floor(Math.random() * 2)]);
        } else {
          // el.textContent = cache;
          cell.set(line.cells[prev].cache);
        }

        if (cell.cache != "&nbsp;") {
          ++iteration;
        }

        if (iteration < MAX_CELL_ITERATION) {
          setTimeout(() => {
            requestAnimationFrame(() => loop(line, cell, iteration));
          }, 16);
        }
      };
      lines.forEach((line, i) => {
        line.cells.forEach((cell) => {
          setTimeout(() => {
            requestAnimationFrame(() => loop(line, cell));
          }, Math.abs(lines.length / 2 - i) * 400);
        });
      });
    };

    let timeout = setTimeout(() => {
      animate1();
    }, 1000);

    console.log(lines);

    return () => {
      clearTimeout(timeout);
      // intro.classList.add("opacity-0");
      lines.forEach((line) => {
        line.cells.forEach((cell) => {
          cell.reset();
        });
      });
    };
  }, []);

  return (
    <section
      className="flex flex-col justify-end h-full"
      style={{
        zIndex: 10,
        position: "relative",
      }}
    >
      <div className="container flex flex-col items-start justify-center">
        <h1 className="font-neu font-normal text-[70px] ">
          <span>The Biggest</span> Decentralized Data<span></span> <span>Warehouse.</span>
        </h1>
        <p ref={introRef} className="anim">
          Lorem ipsum dolor sit amet consectetur.{" "}
        </p>
      </div>
      <button className="bg-transparent">GET ACCESS</button>
    </section>
  );
};
const IntroMemo = memo(Intro);
IntroMemo.displayName = "Intro";
export default IntroMemo;
