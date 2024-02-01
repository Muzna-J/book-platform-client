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
        'custom-beige': '#CDC7E5',
        'custom-white': '#F7F9F9',
        'custom-green': '#00A676',
        'custom-dusty': '#FFEC51',
        'custom-crimson': '#7776BC',
      },
      fontFamily: {
        'mono': ['Courier', 'Courier New', 'monospace'],
      },
      height: {
        '180': '180px',
      }
    },
  },
  plugins: [],
}

