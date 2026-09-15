/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FAF6F0',
          200: '#F5ECE1',
          300: '#EBDDCB',
          400: '#DFCCB4',
        },
        bakery: {
          pink: '#F9DED7',
          rose: '#D97368',
          rosedark: '#B85349',
          peach: '#FEE5D7',
          caramel: '#C87D43',
          carameldark: '#A25E29',
          gold: '#E5A93C',
        },
        espresso: {
          900: '#231610',
          800: '#34221A',
          700: '#483226',
          600: '#644738',
          500: '#866453',
          400: '#A78775',
          200: '#D5C4B8',
          100: '#ECE3DC',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(52, 34, 26, 0.06)',
        'soft-lg': '0 10px 30px -4px rgba(52, 34, 26, 0.1)',
        'soft-xl': '0 20px 40px -6px rgba(52, 34, 26, 0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
