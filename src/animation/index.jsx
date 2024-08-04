import { getRandomChar } from "@/utils";
import Splitting from "splitting";

class Cell {
  constructor({ el, position, value, char }) {
    this.el = el;
    this.position = position;
    this.value = value;
    this.char = char;
  }

  set(char) {
    this.el.textContent = char;
    this.char = char;
  }

  reset() {
    
    this.el.textContent = this.value;
  }
}

export function createTextAnimation(intro, { interation = 45, lineGapTime = 200, charGapTime = 16 } = {}) {
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
  const MAX_CELL_ITERATION = interation;
  const SPACE = "\u00A0";
  const clear = () => {
    lines.forEach((line) => {
      line.cells.forEach((cell) => {
        cell.set(SPACE);
      });
    });
  };
  clear();

  const animate = () => {
    // intro.classList.remove("opacity-0");

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

      if (cell.cache != SPACE) {
        ++iteration;
      }

      if (iteration < MAX_CELL_ITERATION) {
        // setTimeout(() => {
        //   loop(line, cell, iteration);
        //   // requestAnimationFrame(() => );
        // }, charGapTime);
        requestAnimationFrame(() => {
          loop(line, cell, iteration);
        });
      }
    };
    lines.forEach((line, i) => {
      line.cells.forEach((cell) => {
        setTimeout(() => {
          loop(line, cell)
          // requestAnimationFrame(() => );
        }, (i + 1) * lineGapTime);
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
