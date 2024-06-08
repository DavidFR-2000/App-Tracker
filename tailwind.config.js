/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: ['bg-black'],
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

