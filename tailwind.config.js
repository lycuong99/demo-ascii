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
    },
  },
  plugins: [],
};
