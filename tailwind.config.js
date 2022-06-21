module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          1: "#FFE600", // ey yellow
          2: "#F2C94C", // ey yellow
        },
        gray: {
          1: "#47475A", // ey light-black
          2: "#2E2E38", // ey mid-black
          3: "#1A1A28", // ey heavy-black
          4: "#C1BCCC", // ey light-gray for text
        },
      },
      screens: {
        max2xl: { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        maxxl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        maxlg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        maxmd: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        maxsm: { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
}
