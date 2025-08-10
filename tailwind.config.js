module.exports = { 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      transitionDelay: {
        '150': '150ms',
        '300': '300ms'
      },
      zIndex: {
        '10': '10',
        '20': '20',
        '30': '30'
      },
      colors: {
        primary: '#7494ec',
        secondary: '#c9d6ff'
      }
    }
  },
  plugins: [],
}