/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "#f7efea",
          "secondary": "#1b2632",
          "accent": "#1b2632",
          "neutral": "#1b2632",
          "base-100": "white",
        },
        darkMode: {
          "primary": "#f7efea",
          "secondary": "#1b2632",
          "accent": "#1b2632",
          "neutral": "#1b2632",
          "base-100": "#1b2632",
        }
      },
    ]
  }
};
