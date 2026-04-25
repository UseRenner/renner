import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        s: {
          black: "#0d0f12",
          950: "#1a1e23",
          900: "#272d35",
          800: "#38414d",
          700: "#4d5b6a",
          600: "#647589",
          500: "#7d8da0",
          400: "#a7b2be",
          300: "#cad1d8",
          200: "#dce0e5",
          100: "#eaedf0",
          50: "#f6f7f9",
          25: "#fbfbfc",
        },
        green: {
          DEFAULT: "#2d8a4e",
        },
        red: {
          DEFAULT: "#c0392b",
        },
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(13, 15, 18, 0.04)",
        md: "0 4px 12px rgba(13, 15, 18, 0.06)",
        lg: "0 12px 32px rgba(13, 15, 18, 0.08)",
      },
      letterSpacing: {
        headline: "-0.035em",
        headlineTight: "-0.04em",
        micro: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
