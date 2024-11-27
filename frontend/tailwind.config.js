/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        host: ['"Host Grotesk"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        neue: ['Bebas Neue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}