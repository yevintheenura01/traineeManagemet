module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slt: {
          primary: '#0047bb',
          secondary: '#5eb3e4',
          accent: '#ffd700',
          light: '#f5f5f5',
          dark: '#333333',
          sltGreenPrimary: '#00b140',  // SLT Green (Primary Green)
          sltGreenSecondary: '#4caf50',
        },
      },
    },
  },
  plugins: [],
};