const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "black-rgba": "rgba(0, 0, 0, 0.2)",
        dark: "#121212",
        "dark-hover": "#1c1c1c",
        primary: "#FF002E",
      },
      fontFamily: {
        sans: ["Urbanist", ...defaultTheme.fontFamily.sans],
        urbanist: ["Poppins"],
        pop: ["Urbanist"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
