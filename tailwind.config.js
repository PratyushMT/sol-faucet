/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes : {
        'move-up' : {
          '0%': { transform: 'translateY(5px)', opacity : 0 },
          '100%': { transform: 'translateY(0)', opacity : 1 },
        },
        'fade-in' : {
          '0%': { opacity : 0 },
          '100%': { opacity : 1 },
        }
      },
      animation : {
        'move-up' : 'move-up 0.5s ease-in-out',
        'fade-in' : 'fade-in 0.8s ease-in',
      }
    },
  },
  plugins: [],
}