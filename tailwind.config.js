/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#F5D97A',
          400: '#F0C040',
          500: '#D4A017',
          600: '#B8860B',
        },
        forest: {
          400: '#4CAF50',
          500: '#2E7D32',
          600: '#1B5E20',
        },
        charcoal: {
          800: '#1A1A1A',
          900: '#0D0D0D',
          950: '#080808',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      animation: {
        'count-up': 'countUp 2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 160, 23, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(212, 160, 23, 0.8)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
