/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fill: {
      current: 'currentColor',
    },
    colors: {
      'sencha': '#2E4A33',
      'bencha': '#BEBB80',
      'almond': '#F4EFE0',
      'earlgrey': '#E3C9B0',
      'charcoal': '#333333'
    },
    extend: {},
  },
  plugins: [],
}

