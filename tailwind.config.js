/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        frappe: {
          rosewater: '#F2D5CF',
          flamingo: '#EEBEBE',
          pink: '#F4B8E4',
          mauve: '#CA9EE6',
          red: '#E78284',
          maroon: '#EA999C',
          peach: '#EF9F76',
          yellow: '#E5C890',
          green: '#A6D189',
          teal: '#81C8BE',
          sky: '#99D1DB',
          sapphire: '#85C1DC',
          blue: '#8CAAEE',
          lavender: '#BABBF1',
          text: '#C6D0F5',
          subtext1: '#B5BFE2',
          subtext0: '#A5ADCE',
          overlay2: '#949CBB',
          overlay1: '#838BA7',
          overlay0: '#737994',
          surface2: '#626880',
          surface1: '#51576D',
          surface0: '#414559',
          base: '#303446',
          mantle: '#292C3C',
          crust: '#232634',
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
