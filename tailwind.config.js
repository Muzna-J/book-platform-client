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
        'custom-beige': '#EBEBEB',
        'custom-white': '#F7F9F9',
        'custom-green': '#00A676',
        'custom-dusty': '#C5D0D3',
        'custom-crimson': '#CC7B8B',
        'custom-hover': '#27187E',
        'custom-nav': '#CC7B8B',
        'custom-button': '#CC7B8B'
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

