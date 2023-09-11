/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.js", "./dist/**/*.css"],
  theme: {
    extend: {
      backgroundImage: {
        'house': "url('./img/house.jpg')"
      }
    },
  },
  plugins: [],
}

