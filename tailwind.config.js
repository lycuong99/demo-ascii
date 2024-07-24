/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily:{
      neu: ['"Neue Machina"', 'Helvetica', 'Arial','sans-serif'],
    },
    extend: {
      
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
