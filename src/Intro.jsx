import { useEffect } from "react";
import Splitting from "splitting";

class Line {}

class Cell {}
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
const Intro = () => {
  useEffect(() => {
    const intro = document.querySelector(".anim");
    const results = Splitting({
      target: intro,
      by: "lines",
    });
    results.forEach((s) => Splitting({ target: s.words }));

    const lines = results[0].lines.map((line, index) => {
      const words = line;
      const cells = words.flatMap((word, index) => {
        const chars = word.querySelectorAll(".char");

        return [...chars].map((char, index) => {
          return {
            el: char,
            position: index,
            value: char.textContent,
            char: char.textContent,
          };
        });
      });

      return {
        position: index,
        el: line,
        cells: cells,
      };
    });
    const clear = ()=>{
        lines.forEach((line) => {
            line.cells.forEach((cell) => {
                cell.el.innerHTML = '&nbsp;';
            });
          });
    }
    clear();
    const animate = () => {
      const MAX_CELL_ITERATION = 40;

      const loop = (line, cell, iteration = 0) => {
        const el = cell.el;
        const prev = cell.position === 0 ? 0 : cell.position - 1;

        const cache = line.cells[prev].char;
        if (iteration === MAX_CELL_ITERATION - 1) {
          el.textContent = cell.value;
        } else if (cell.position === 0) {
          const randomChar = lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
          cell.char = randomChar;
          el.textContent = randomChar;
        } else {
          el.textContent = cache;
        }

        iteration++;
        if (iteration < MAX_CELL_ITERATION) {
          setTimeout(() => {
            loop(line, cell, iteration);
          }, 50);
        }
      };
      lines.forEach((line) => {
        line.cells.forEach((cell) => {
          setTimeout(() => {
            loop(line, cell);
          }, 50);
        });
      });
    };

    animate();

    console.log(lines);
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
        <p className="anim">Lorem ipsum dolor sit amet consectetur. </p>
      </div>
      <button className="bg-transparent">GET ACCESS</button>
    </section>
  );
};
export default Intro;
