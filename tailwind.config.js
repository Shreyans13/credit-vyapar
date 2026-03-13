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
        // Premium Theme Colors
        primary: '#0f172a',      // Navy
        accent: '#eebd2b',       // Gold
        'background-light': '#ffffff',
        'background-dark': '#0f172a',
        // Keep legacy for compatibility
        'legacy-primary': '#1152d4',
      },
      fontFamily: {
        sans: ['Public Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
