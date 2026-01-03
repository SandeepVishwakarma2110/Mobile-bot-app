/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  animation: {
  "spin-slow": "spin 12s linear infinite",
}
};
