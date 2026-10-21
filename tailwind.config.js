// Builds styles.css from the classes the pages use. Rebuild after changing any class in an .html file:
//   npx tailwindcss@3.4.19 -c tailwind.config.js -i tailwind.input.css -o styles.css --minify
module.exports = {
  content: ['./*.html'],
  theme: { extend: {} },
  plugins: [],
};
