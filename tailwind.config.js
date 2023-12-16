/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        modalPop: {
          '0%': { transform: 'scale(0.1)' },
          '50%': { transform: 'scale(0.5)' },
          "100%" : { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}