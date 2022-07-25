module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          100: "#A4A4F4",
          200: "#A4A4F4",
          300: "#A4A4F4",
          400: "#A4A4F4",
          500: "#A4A4F4",
          600: "#A4A4F4",
          700: "#A4A4F4",
          800: "#474578",
          900: "#A4A4F4",
        },
        pink: {
          800: "#FFA4D4"
        },
        green: {
          100: "#A8FFC5",
          200: "#A8FFC5",
          300: "#A8FFC5",
          400: "#A8FFC5",
          500: "#A8FFC5",
          600: "#A8FFC5",
          700: "#A8FFC5",
          800: "#A8FFC5",
          900: "#79E8B3",
        },
      },
      fontFamily: {
        sans: ["Comic Neue", "cursive"],
        serif: ["Comic Neue", "cursive"],
      },
    },
  },
  plugins: [require('daisyui')],
};
