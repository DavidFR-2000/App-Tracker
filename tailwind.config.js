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
    extend: {colors:  {
      fondoWeb: '#333333',
      texto: '#FAF9F6',
      secciones: '#2A3D66',
      enfasis1: '#D32F2F',
      enfasis2: '#6A1B9A'
    },
    fontFamily: {
      'titulo': 'Merriweather, serif',
      'parrafo': 'Roboto, sans-serif'
  }},
  },
  plugins: [],
}

