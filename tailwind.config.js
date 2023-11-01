/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "Cinzel"],
        cinzel: ["Cinzel", "Fauna"],
        fauna: ["Fauna One", "Orbitron"],
        orbitron: ["Orbitron", "Cinzel"],
      },
    },
  },
  plugins: [],
};
