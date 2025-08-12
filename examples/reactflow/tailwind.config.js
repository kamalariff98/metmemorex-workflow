/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'node-central': '#3b82f6',
        'node-main': '#10b981',
        'node-regular': '#f3f4f6',
        'node-regular-dark': '#374151',
      }
    },
  },
  plugins: [],
}