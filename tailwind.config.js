/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          '0%': { opacity: '0', display: 'block' },
          // '33%': { opacity: '0.33' },
          // '67%': { opacity: '0.67' },
          '100%': { opacity: '1' }
        },
        fadeout: {
          '0%': { opacity: '1', display: 'block' },
          // '33%': { opacity: '0.67' },
          // '67%': { opacity: '0.33' },
          '100%': { opacity: '0', display: 'none' }
        }
      },
      animation: {
        fadein: 'fadein 700ms ease-in both',
        fadeout: 'fadeout 700ms ease-out both'
      },
      colors: {
        'netflix_red': "#E50914",
        'netflix_red2': "#B20710"
      }
    },
  },
  plugins: [],
}

