/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: 'oklch(0.13 0.005 150)',
        canopy: 'oklch(0.17 0.025 150)',
        moss: 'oklch(0.27 0.06 150)',
        'emerald-deep': 'oklch(0.42 0.12 150)',
        emerald: 'oklch(0.55 0.15 150)',
        gold: 'oklch(0.78 0.13 85)',
        'gold-soft': 'oklch(0.89 0.12 92)',
        fog: 'oklch(0.96 0.01 100)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(201, 161, 59, 0.4)',
        emerald: '0 0 15px rgba(85, 180, 150, 0.2)',
      }
    },
  },
  plugins: [],
}
