/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#1DB954',
          600: '#179646',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(29,185,84,0.25), 0 6px 24px rgba(29,185,84,0.25)',
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
