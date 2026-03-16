import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        tight: ["var(--font-inter-tight)", "sans-serif"],
      },
      colors: {
        blue: {
          cuba: "#002A8F",
          main: "#2563EB",
        },
        red: {
          cuba: "#CF142B",
        },
      },
    },
  },
  plugins: [],
};

export default config;
