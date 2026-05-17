/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // যদি তোমার ফোল্ডারের নাম 'Componets' হয় তবে নিচের লাইনটি অ্যাড করো
    "./src/Componets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo 600
        secondary: "#06B6D4", // Cyan
        darkBg: "#020617",
        darkCard: "#0f172a",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        barSlide: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        dotPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out forwards",
        barSlide: "barSlide 2s infinite linear",
        dotPulse: "dotPulse 1.5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
