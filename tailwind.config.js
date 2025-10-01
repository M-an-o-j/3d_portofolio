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
      keyframes: {
        auroraMoveA: {
          '0%':   { transform: 'translateX(-30%) translateY(0) rotate(-15deg)', opacity: '0.35' },
          '50%':  { transform: 'translateX(30%) translateY(-6%) rotate(-10deg)', opacity: '0.7' },
          '100%': { transform: 'translateX(-30%) translateY(0) rotate(-15deg)', opacity: '0.35' }
        },
        auroraMoveB: {
          '0%':   { transform: 'translateX(30%) translateY(0) rotate(10deg)', opacity: '0.25' },
          '50%':  { transform: 'translateX(-30%) translateY(8%) rotate(8deg)', opacity: '0.65' },
          '100%': { transform: 'translateX(30%) translateY(0) rotate(10deg)', opacity: '0.25' }
        },
        auroraPulse: {
          '0%':   { opacity: '0.25' },
          '50%':  { opacity: '0.9' },
          '100%': { opacity: '0.25' }
        },
      },
      animation: {
        'aurora-a': 'auroraMoveA 12s ease-in-out infinite',
        'aurora-b': 'auroraMoveB 16s ease-in-out infinite',
        'aurora-pulse': 'auroraPulse 6s ease-in-out infinite',
      },
      colors: {
        auroraBlue: '#6ee7b7',
        auroraPurple: '#7c3aed',
        auroraPink: '#fb7185'
      },
      blur: {
        xs: '4px',
        smd: '18px'
      }
    },
  },
  plugins: [],
}
