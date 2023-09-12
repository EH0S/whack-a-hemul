/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.js", "./dist/**/*.css", "./dist/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'default': "url('./dist/img/mountains.jpg')"
        
      },
    },
  },
  plugins: [],
}

