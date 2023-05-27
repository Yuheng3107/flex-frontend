// tailwind.config.js
module.exports = {
  mode: "jit", // Optionally use just in time engine
  purge: ["./src/**/*.{js,jsx,ts,tsx,css}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      colors:{
        'theme-off-white' : '#FEFCFB',
        'pantone-orange': '#FC6111'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
