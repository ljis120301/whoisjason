/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import svgToDataUri from "mini-svg-data-uri";
import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";

function flattenColors(input, prefix = []) {
  const result = {};
  for (const [key, value] of Object.entries(input || {})) {
    if (typeof value === "object" && value !== null) {
      Object.assign(result, flattenColors(value, [...prefix, key]));
    } else {
      result[[...prefix, key].join("-")] = value;
    }
  }
  return result;
}

function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColors(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ":root": newVars });
}

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-oxproto)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        frappe: {
          rosewater: "#F2D5CF",
          flamingo: "#EEBEBE",
          pink: "#F4B8E4",
          mauve: "#CA9EE6",
          red: "#E78284",
          maroon: "#EA999C",
          peach: "#EF9F76",
          yellow: "#E5C890",
          green: "#A6D189",
          teal: "#81C8BE",
          sky: "#99D1DB",
          sapphire: "#85C1DC",
          blue: "#8CAAEE",
          lavender: "#BABBF1",
          text: "#C6D0F5",
          subtext1: "#B5BFE2",
          subtext0: "#A5ADCE",
          overlay2: "#949CBB",
          overlay1: "#838BA7",
          overlay0: "#737994",
          surface2: "#626880",
          surface1: "#51576D",
          surface0: "#414559",
          base: "#303446",
          mantle: "#292C3C",
          crust: "#232634",
        },
        latte: {
          rosewater: "#DC8A78",
          flamingo: "#DD7878",
          pink: "#EA76CB",
          mauve: "#8839EF",
          red: "#D20F39",
          maroon: "#E64553",
          peach: "#FE640B",
          yellow: "#DF8E1D",
          green: "#40A02B",
          teal: "#179299",
          sky: "#04A5E5",
          sapphire: "#209FB5",
          blue: "#1E66F5",
          lavender: "#7287FD",
          text: "#4C4F69",
          subtext1: "#5C5F77",
          subtext0: "#6C6F85",
          overlay2: "#7C7F93",
          overlay1: "#8C8FA1",
          overlay0: "#9CA0B0",
          surface2: "#ACB0BE",
          surface1: "#BCC0CC",
          surface0: "#CCD0DA",
          base: "#EFF1F5",
          mantle: "#E6E9EF",
          crust: "#DCE0E8",
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "loop-scroll": "loop-scroll 50s linear infinite",
        move: "move 5s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        move: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(200px)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      const colorValues = flattenColors(theme("colors"));
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
          "bg-dot-thick": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"16\" height=\"16\" fill=\"none\"><circle fill=\"${value}\" cx=\"8\" cy=\"8\" r=\"2.2\"></circle></svg>`
            )}")`,
          }),
        },
        { values: colorValues, type: "color" }
      );
    },
    typography,
    // Flowbite plugin
    require('flowbite/plugin')
  ],
};

export default config;