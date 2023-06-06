// tailwind.config.js
module.exports = {
  mode: "jit", // Optionally use just in time engine
  purge: ["./src/**/*.{js,jsx,ts,tsx,css}", "./public/index.html"],
  darkMode: "class", //  'media' or 'class' or 'false'
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      colors:{
        'theme-off-white' : '#FEFCFB',
        'pantone-orange': '#FC6111',
        'pantone-orange-300':'#ffb793',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
