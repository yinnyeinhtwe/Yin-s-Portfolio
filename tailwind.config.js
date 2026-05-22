/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Lexend"', 'sans-serif'],
      },
      colors: {
        white:    '#FFFFFF',
        black:    '#000000',
        ink:      '#1A1A1A',
        secondary:'#3D3D3D',
        border:   '#C2C2C2',
        surface:  '#F7F7F7',
        muted:    '#7A7A7A',
      },
      animation: {
        'fade-up':      'fadeUp 0.6s ease forwards',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'line-grow':    'lineGrow 1s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          '0%':   { width: '0%' },
          '100%': { width: '100%' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
