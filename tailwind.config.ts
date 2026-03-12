import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(215 20% 26%)",
        background: "hsl(224 71% 4%)",
        foreground: "hsl(210 40% 98%)",
      },
    },
  },
  plugins: [],
};

export default config;
