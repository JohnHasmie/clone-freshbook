/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      spacing: {
        button: ".5rem",
      },
      colors: {
        current: "currentColor",
      }
    },
  },
  plugins: [],
}
