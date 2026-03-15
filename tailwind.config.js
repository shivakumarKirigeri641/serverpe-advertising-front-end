/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff8f1",
          100: "#ffe8d0",
          200: "#ffc899",
          300: "#ffa05c",
          400: "#ff7a24",
          500: "#f55f00",
          600: "#cc4a00",
          700: "#a33a00",
          800: "#7a2c00",
          900: "#521d00",
        },
        dark: {
          900: "#0d0f1a",
          800: "#181b2e",
          700: "#232740",
          600: "#2e3352",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
