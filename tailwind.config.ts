import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      kiosk: "720px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        "flip-back": {
          "0%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
        "flip-back-left": {
          "0%": { transform: "rotateY(270deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        "flip-back-right": {
          "0%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
        "flip-back-loop": {
          "0%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(180deg)" },
          // "50%": { transform: "rotateY(deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        slide: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-20%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(50%)" },
          // "50%": { transform: "translateY(-20%)" },
          "100%": { transform: "translateY(5%)" },
        },
        scaleUp: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        scaleUpWin: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        flip: "flip 0.5s ease-in-out forwards",
        "flip-back": "flip-back 0.5s ease-in-out forwards",
        "flip-back-loop": "flip-back-loop 1.5s ease-in-out infinite",
        "flip-back-left": "flip-back-left 0.5s ease-in-out forwards",
        "flip-back-right": "flip-back-right 0.5s ease-in-out forwards",
        slide: "slide 5s linear infinite",
        slideUp: "slideUp 0.5s linear forwards",
        scaleUp: "scaleUp 0.5s ease-in-out forwards",
        scaleUpWin: "scaleUpWin 1.5s ease-in-out forwards"
      },
    },
  },
  plugins: [],
};
export default config;
