/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Chakra' : "'Chakra Petch', sans-serif",
        'RobotoCondensed' : "'Roboto Condensed', sans-serif",
        'Inter' : "'Inter', sans-serif",
      },
      gridTemplateColumns:{
        fluid:"repeat(auto-fit, minmax(23rem,2fr))"
      }
    },
  },
  plugins: [],
}