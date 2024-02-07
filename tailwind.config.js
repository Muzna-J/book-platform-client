/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/context/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-beige': '#F1F2F6',
        'custom-white': '#F7F9F9',
        'custom-green': '#00A676',
        'custom-dusty': '#AEB8FE',
        'custom-crimson': '#27187E',
        'custom-orange': '#FF8600',
        'custom-nav': '#758BFD',
        'custom-button': '#27187E'
      },
      fontFamily: {
        'mono': ['Arial', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      height: {
        '180': '180px',
      },
      toastStyle: {
        'bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4': {},
      },
    },
  },
  plugins: [],
}

