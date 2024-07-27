/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      neu: ['"Neue Machina"', "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      boxShadow: {
        solid: `3px 3px var(--tw-shadow-color, #fff)`,
      },
      colors: {
        bg: "#04051C",
        blueBlack: "#010327"
      },
    },
    container: {
      center: true,
      // padding:{
      //   DEFAULT: "2rem",
      //   // sm: '2rem',
      //   // lg: '4rem',
      //   // xl: '5rem',
      // },
      screens:{
        sm: "100vw",
        // md: "768px",
        // lg: "1024px",
        // xl: "1280px",
        // "2xl": "1540px",
        // "3xl": "1800px",
      }
    },
  },
  plugins: [],
};
