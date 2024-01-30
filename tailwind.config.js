/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#76cce8",
        card: "#0f172a",
        back: "#1e293b",
        success: "#0fff50",
        error: "#ff0f50",
        txtcolor: "#ffffff",
      },
    },
  },
  plugins: [],
};
