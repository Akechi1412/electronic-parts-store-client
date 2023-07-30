/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // extend: {
    //   backgroundImage: {
    //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    //     'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    //   },
    // },
    colors: {
      shark: {
        DEFAULT: '#1D2023',
        70: 'rgba(29, 32, 35, 70)',
        80: 'rgba(29, 32, 35, 85)',
        85: 'rgba(29, 32, 35, 85)',
        90: 'rgba(29, 32, 35, 90)',
      },
      'blue-ribbon': '#1463F3',
      ghost: '#CCD0D8',
      malibu: '#84A4FC',
      'light-gray': '#F5F5F5',
      white: '#FFFFFF',
      danger: '#C01313',
      success: '#449342',
    },
    borderColor: {
      shark: {
        DEFAULT: '#1D2023',
        70: 'rgba(29, 32, 35, 70)',
        80: 'rgba(29, 32, 35, 80)',
        85: 'rgba(29, 32, 35, 85)',
        90: 'rgba(29, 32, 35, 90)',
      },
      ghost: '#CCD0D8',
      'blue-ribbon': '#1463F3',
      danger: '#C01313',
      success: '#449342',
    },
  },
  plugins: [],
};
