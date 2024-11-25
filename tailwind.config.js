/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
      },
      colors: {
        primary: "#8E4585", // 주 색상
        secondary: "#6C3483", // 보조 색상
        accent: "#F39C12", // 강조 색상
        light: "#F4ECF7", // 밝은 배경색
        dark: "#6C3483", // 어두운 배경색
        danger: "#E74C3C", // 경고/에러 색상
        success: "#22c55e", //성공 색상
      },
    },
  },
  plugins: [],
};
