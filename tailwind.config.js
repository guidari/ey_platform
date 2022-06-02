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
        },
        gray: {
          1: "#47475A", // ey light-black
          2: "#2E2E38", // ey mid-black
          3: "#1A1A28", // ey heavy-black
        },
      },
    },
  },
  plugins: [],
}
