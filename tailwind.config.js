/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Libre Franklin'", "system-ui", "sans-serif"],
      },
      keyframes: {
        ticker: { "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(-100%)" } },
        fadeIn: { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
      animation: {
        ticker: "ticker 28s linear infinite",
        "ticker-fast": "ticker 18s linear infinite",
        fadeIn: "fadeIn 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};
