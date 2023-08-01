/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {

      animation: {
        "pulse-red": "pulse-red 2s",
      },
      keyframes: {
        "pulse-red": {
          "0%": { boxShadow: "0 0 0 0 rgba(255, 100, 100, 0.7)" },
          "70%": { boxShadow: "0 0 0 10px rgba(255, 100, 100, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255, 100, 100, 0)" },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: [
        "responsive",
        "motion-safe",
        "motion-reduce",
        "hover",
        "focus",
        "active",
        "group-hover",
      ],
    },
  },
  plugins: [],
};
