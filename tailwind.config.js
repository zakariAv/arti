import { animations, transform } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        silver: "#f1f5f9",
        light: "#e5e7eb",
      },
      fontFamily: {
        Rubik: ["Rubik", "sans-serif"],
      },
      boxShadow: {
        smooth: "0 1px 3px #0000001f, 0 1px 2px #0000003d",
        medium: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      },
      backgroundColor: {},
      backgroundImage: {
        gradientDark:
          "radial-gradient(ellipse at 97% 0%, #192565 1%, #1F2937 42%)",
        blobDesc:"url('../')"
      },
      keyframes: {
        slideLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-240px) " },
        },
      },
      animation: {
        "slide-left": "slideLeft 400ms linear 1",
      },
    },
  },
  plugins: [
  
      // ...
      require('tailwind-scrollbar')({ nocompatible: true }),

  ],
};
