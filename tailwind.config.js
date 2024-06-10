// tailwind.config.js
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
    extend: {
      colors: {
        fondoWeb: '#333333',
        texto: '#FAF9F6',
        secciones: '#2A3D66',
        enfasis1: '#D32F2F',
        enfasis2: '#6A1B9A'
      },
      fontFamily: {
        'titulo': ['Merriweather', 'serif'],
        'parrafo': ['Roboto', 'sans-serif']
      },
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: theme => ({
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'registro-fondo': "url('/public/irelia-register.webp')",
        'login-fondo': "url('/public/ashein-login.png')", 
        'detalles-fondo': "url('/public/Historial.webp')",
      }),
      backgroundSize: {
        '200%': '200% 200%',
        'cover': 'cover',
      },
      spacing: {
        '104': '26rem', // 384px, valor añadido para mayor ancho del formulario
      },
    },
  },
  plugins: [],
}
