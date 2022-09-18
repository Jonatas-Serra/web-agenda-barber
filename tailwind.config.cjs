/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      animation: {
        'slidebottom': 'slidebottom 1.2s ease-in-out both',
        'slideleft': 'slideleft 1.2s ease-in-out both',

      },
      keyframes: {
        slidebottom: {
          '0%': { transform: 'translateY(-550px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        slideleft: {
          '0%': { transform: 'translatex(-550px)' },
          '100%': { transform: 'translatex(0px)' },
        }
      },
      backgroundImage: {
        hero: 'url(/src/assets/back.jpg)',
        hero2: 'url(/src/assets/back2.jpg)',
      },
      fontFamily: {
        sans: 'Lato, sans-serif',
      },
      colors: {
        zinc: {
          900: '#181A20',
          700: '#272a30',
          500: '#88888b',
          400: '#cccccc',
          300: '#e4e4e4',
        },
        orange: {
          400: '#E3A14B',
          500: '#F4972E',
        },
        white: {
          100: '#f8fafb',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
}