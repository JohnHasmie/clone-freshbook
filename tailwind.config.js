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
