/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agro-dark': '#2d5f4f',
        'agro-primary': '#4a8b6f',
        'agro-light': '#6fb88f',
        'agro-accent': '#8bc34a',
        'soil-dark': '#5a7a6a',
        'soil-light': '#e8ebe5',
        'soil-cream': '#f5f6f4',
        'tech-teal': '#2d5f5f',
        'tech-cyan': '#3d7a7a',
        'tech-light': '#5a9a9a',
        'sun-orange': '#e85d4a',
        'sun-yellow': '#f4a742',
        'harvest-gold': '#f5b942',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
