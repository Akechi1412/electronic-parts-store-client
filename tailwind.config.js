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
    container: {
      padding: '60px',
    },
    colors: {
      transparent: 'transparent',
      shark: {
        DEFAULT: '#1D2023',
        50: 'rgba(29, 32, 35, 50)',
        70: 'rgba(29, 32, 35, 70)',
        80: 'rgba(29, 32, 35, 85)',
        85: 'rgba(29, 32, 35, 85)',
        90: 'rgba(29, 32, 35, 90)',
      },
      'blue-ribbon': '#1463F3',
      ghost: {
        DEFAULT: '#CCD0D8',
        30: 'rgba(204, 208, 216, 30)',
        50: 'rgba(204, 208, 216, 50)',
        70: 'rgba(204, 208, 216, 70)',
        80: 'rgba(204, 208, 216, 80)',
        85: 'rgba(204, 208, 216, 85)',
        90: 'rgba(204, 208, 216, 90)',
      },
      malibu: {
        DEFAULT: '#84A4FC',
        50: 'rgba(132, 164, 252, 50)',
        70: 'rgba(132, 164, 252, 70)',
        80: 'rgba(132, 164, 252, 80)',
        85: 'rgba(132, 164, 252, 85)',
        90: 'rgba(132, 164, 252, 90)',
      },
      'light-gray': '#F5F5F5',
      white: '#FFFFFF',
      danger: '#C01313',
      success: '#449342',
    },
    borderColor: {
      shark: {
        DEFAULT: '#1D2023',
        50: 'rgba(29, 32, 35, 50)',
        70: 'rgba(29, 32, 35, 70)',
        80: 'rgba(29, 32, 35, 80)',
        85: 'rgba(29, 32, 35, 85)',
        90: 'rgba(29, 32, 35, 90)',
      },
      ghost: '#CCD0D8',
      'blue-ribbon': '#1463F3',
      malibu: {
        DEFAULT: '#84A4FC',
        70: 'rgba(132, 164, 252, 70)',
        80: 'rgba(132, 164, 252, 80)',
        85: 'rgba(132, 164, 252, 85)',
        90: 'rgba(132, 164, 252, 90)',
      },
      'light-gray': '#F5F5F5',
      white: '#FFFFFF',
      danger: '#C01313',
      success: '#449342',
    },
  },
  plugins: [],
};
