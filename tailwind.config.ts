import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#344C3D',
          light: '#425F4D',
          dark: '#27392E',
        },
        ivory: {
          DEFAULT: '#F4F0E7',
          dark: '#E7E0D0',
        },
        earth: {
          DEFAULT: '#815A37',
          light: '#9E7148',
          dark: '#67462A',
        },
        charcoal: {
          DEFAULT: '#242824',
          muted: '#4A504A',
          light: '#727B72',
        },
        sand: {
          DEFAULT: '#E9E4D8',
          light: '#F8F6F1',
        },
        trust: {
          declared: '#B45309',
          reviewed: '#0D9488',
          certified: '#15803D',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

