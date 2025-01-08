/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon': {
          primary: '#00fff9',
          secondary: '#ff00ff',
          dark: '#0a0a0f',
        },
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s infinite',
        'neon-glow': 'neon-glow 3s infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        'neon-glow': {
          '0%, 100%': { textShadow: '0 0 5px currentColor' },
          '50%': { textShadow: '0 0 20px currentColor' },
        },
      },
    },
  },
  plugins: [],
}
