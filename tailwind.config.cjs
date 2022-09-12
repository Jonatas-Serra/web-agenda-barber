/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: 'url(/src/assets/back.jpg)'
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