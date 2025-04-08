module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./src/components/**/*.jsx"
  ],
  theme: {
    extend: {
      colors: {
        // Paleta PS2
        'ps2-black': '#000000',
        'ps2-blue': '#0038B8',
        'ps2-gray': '#5E5E5E',
        'ps2-silver': '#C0C0C0',
        'ps2-red': '#FF0000',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        'ps2': '0 4px 12px -1px rgba(0, 56, 184, 0.25)' // sombra estilo PS2
      },
      borderWidth: {
        'ps2': '3px' // Borde grueso para estilo PS2
      }
    },
  },
  plugins: [],
}