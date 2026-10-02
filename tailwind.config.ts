import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a1711",
          900: "#0d1f16",
          800: "#122b1d",
          700: "#1a3a27",
        },
        gold: {
          400: "#d9b45f",
          500: "#c9a227",
          600: "#a9821c",
        },
        cream: {
          50: "#f8f6f0",
          100: "#f4f1ea",
          200: "#eae4d4",
        },
        sage: {
          400: "#8ea17e",
          500: "#6f8a5c",
          600: "#55693f",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
