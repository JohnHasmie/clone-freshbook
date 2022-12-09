/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.js"],
  
  theme: {
    extend: {
      spacing: {
        button: ".5rem",
      },
      colors: {
        current: "currentColor",
        secondary: '#576981',
        blueDefault:'#0075dd',
        primary: {
          DEFAULT: "#0175DD",
        },
        success: {
          DEFAULT: "#36A703",
        }
      }
    },
  },
  plugins: [],
}
