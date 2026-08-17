import type { Config } from 'tailwindcss';

/** Палитра дизайн-макета StreamVibe (OTT Dark Theme) */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', lg: '2rem', '2xl': '5rem' },
      screens: { '2xl': '1440px' },
    },
    extend: {
      colors: {
        'black-06': '#0F0F0F',
        'black-08': '#141414',
        'black-10': '#1A1A1A',
        'black-12': '#1F1F1F',
        'black-15': '#262626',
        'black-20': '#333333',
        'black-25': '#404040',
        'grey-60': '#999999',
        'grey-65': '#A6A6A6',
        'grey-70': '#B3B3B3',
        'grey-75': '#BFBFBF',
        'red-40': '#CC0000',
        'red-45': '#E50000',
        'red-50': '#FF0000',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
