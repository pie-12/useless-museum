import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/rooms/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        museum: {
          paper: "#F7F4EE",
          parchment: "#EAE5D8",
          ink: "#241F1A",
          sepia: "#6A5543",
          wood: "#42281D",
          stamp: "#A83232",
          brass: "#C29B38",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        mono: ['"Courier New"', "Courier", "monospace"],
      },
      boxShadow: {
        ticket: "0 10px 25px -5px rgba(66, 40, 29, 0.15), 0 8px 10px -6px rgba(66, 40, 29, 0.1)",
        win98: "inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf",
        "win98-pressed": "inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey",
      },
    },
  },
  plugins: [],
};

export default config;
