/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: '#3e4a56',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  darkMode:'class',
  
}

