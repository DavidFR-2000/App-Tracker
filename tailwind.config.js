/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.{js,ts,jsx,tsx}",
      "./resources/**/*.vue",

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

