/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        system: {
          bg: '#0b0f16',
          panel: '#0f1624',
          accent: '#2ee6a6',
          secondary: '#6ee7ff',
          warning: '#ffb020',
          danger: '#ff5a5a'
        }
      },
      boxShadow: {
        system: '0 0 24px rgba(46, 230, 166, 0.15)'
      }
    }
  },
  plugins: []
}

