/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // Update paths to match your project structure
      theme: {
        extend: {
          animation: {
            glitch: "glitch 0.5s infinite",
          },
          keyframes: {
            glitch: {
              "0%": { transform: "skewX(0deg)" },
              "25%": { transform: "skewX(-5deg)" },
              "50%": { transform: "skewX(5deg)" },
              "75%": { transform: "skewX(-5deg)" },
              "100%": { transform: "skewX(0deg)" },
            },
          },
        },
      },
  };