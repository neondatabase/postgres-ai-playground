/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('./src/styles/plugins/theming.js'),
  ],
};
