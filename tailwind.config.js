module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: () => ({
      darkblue: '#191E3D',
      orangedark: '#E26B4C',
      overorange: '#B13A1A',
      black: '#000000',
    }),

    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
