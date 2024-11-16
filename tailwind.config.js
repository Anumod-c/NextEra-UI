/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'four-color-gradient': 'linear-gradient(to bottom, #93c5fd, #e0f2fe, #bfdbfe, #1e3a8a)',
      },
    },
  },
  plugins: [],
}
