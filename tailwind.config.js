module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        knewave: ['Knewave', 'cursive'], // fallback is cursive
        permanent_marker: ['Permanent Marker', 'cursive'], // fallback is cursive
      },
    },
  },
  plugins: [],
}
