/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-green-light': '#DFEDCB', //연두색
        'custom-green-dark': '#C6D5B0', //진연두색
        'custom-gray-light': '#EEF1F5', //연회색
        'custom-gray-dark': '#D9D9D9', //진회색
      },
      fontFamily: {
        'chosungu': ['ChosunGu', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}