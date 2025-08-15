/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#561818",
        "primary-light": "#6b2121",
        "primary-dark": "#3d1010",
      },
      fontFamily: {
        arabic: ["Mada", "sans-serif"],
        english: ["Inter", "sans-serif"],
        hero: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
