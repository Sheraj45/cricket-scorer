/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: '#0F1B12',
        chalk: '#F7F3E8',
        brass: '#C8A24A',
        ball: '#8B2E2E',
        outfield: '#3F6B4F',
        slate: '#2A2A28',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}