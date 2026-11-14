/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rebloom: {
          50: '#FBF9FE',
          100: '#F4EFFF',
          200: '#E9DEFF',
          300: '#D5C2FE',
          400: '#B89BFA',
          500: '#9B72F3',
          600: '#7F4BE5',
          700: '#6836C7',
          800: '#542CA2',
          900: '#432581',
          950: '#271253',
        },
        bloom: {
          purple: '#7F4BE5',
          'purple-dark': '#5D2FB8',
          'purple-light': '#F4EFFF',
          lavender: '#EDE9FE',
          pink: '#FCE7F3',
          peach: '#FFEDD5',
          'peach-soft': '#FFF7ED',
          dark: '#1E1B2E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(127, 75, 229, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 12px 30px -4px rgba(127, 75, 229, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 25px rgba(127, 75, 229, 0.25)',
      }
    },
  },
  plugins: [],
}
