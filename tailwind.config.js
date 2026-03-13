/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1152d4',
        accent: '#eebd2b',
        'background-light': '#f6f6f8',
        'background-dark': '#101622',
      },
      fontFamily: {
        sans: ['Inter', 'Public Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
