/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light_tile: "#F0D8B6",
        dark_tile: "#B48764",
        bg_color: "#202020",
      },
      width: {
        "tile-size": "100px",
        600: "600px",
      },
      height: {
        "tile-size": "100px",
        600: "600px",
      },
      fontFamily: {
        sofia: ['"Sofia Sans"', "sans-serif"],
      },
      transitionProperty: {
        "left-top": "left, top",
      },
      transitionDuration: {
        300: "300ms",
      },
      transitionTimingFunction: {
        ease: "ease",
      },
      // for max-width: 450 title-size is 50px
    },
  },
  plugins: [],
};
