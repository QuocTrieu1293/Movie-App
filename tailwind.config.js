/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
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
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),],
}

