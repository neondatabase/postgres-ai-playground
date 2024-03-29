import typographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class',
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'up-down': {
          '0%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'none' },
          '100%': { transform: 'translateY(-5%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'up-down': 'up-down 5s linear infinite',
      },
      colors: {
        primary: {
          app: 'var(--green-1)',
          'app-subtle': 'var(--green-2)',
          element: 'var(--green-3)',
          'element-hover': 'var(--green-4)',
          'element-active': 'var(--green-5)',
          DEFAULT: 'var(--green-6)',
          hover: 'var(--green-7)',
          active: 'var(--green-8)',
          solid: 'var(--green-9)',
          'solid-hover': 'var(--green-10)',
          base: 'var(--green-11)',
          'high-contrast': 'var(--green-12)',
        },
        muted: {
          app: 'var(--sage-1)',
          'app-subtle': 'var(--sage-2)',
          element: 'var(--sage-3)',
          'element-hover': 'var(--sage-4)',
          'element-active': 'var(--sage-5)',
          DEFAULT: 'var(--sage-6)',
          hover: 'var(--sage-7)',
          active: 'var(--sage-8)',
          solid: 'var(--sage-9)',
          'solid-hover': 'var(--sage-10)',
          base: 'var(--sage-11)',
          'high-contrast': 'var(--sage-12)',
        },
        warning: {
          app: 'var(--yellow-1)',
          'app-subtle': 'var(--yellow-2)',
          element: 'var(--yellow-3)',
          'element-hover': 'var(--yellow-4)',
          'element-active': 'var(--yellow-5)',
          DEFAULT: 'var(--yellow-6)',
          hover: 'var(--yellow-7)',
          active: 'var(--yellow-8)',
          solid: 'var(--yellow-9)',
          'solid-hover': 'var(--yellow-10)',
          base: 'var(--yellow-11)',
          'high-contrast': 'var(--yellow-12)',
        },
        success: {
          app: 'var(--green-1)',
          'app-subtle': 'var(--green-2)',
          element: 'var(--green-3)',
          'element-hover': 'var(--green-4)',
          'element-active': 'var(--green-5)',
          DEFAULT: 'var(--green-6)',
          hover: 'var(--green-7)',
          active: 'var(--green-8)',
          solid: 'var(--green-9)',
          'solid-hover': 'var(--green-10)',
          base: 'var(--green-11)',
          'high-contrast': 'var(--green-12)',
        },
        danger: {
          app: 'var(--red-1)',
          'app-subtle': 'var(--red-2)',
          element: 'var(--red-3)',
          'element-hover': 'var(--red-4)',
          'element-active': 'var(--red-5)',
          DEFAULT: 'var(--red-6)',
          hover: 'var(--red-7)',
          active: 'var(--red-8)',
          solid: 'var(--red-9)',
          'solid-hover': 'var(--red-10)',
          base: 'var(--red-11)',
          'high-contrast': 'var(--red-12)',
        },
      },
    },
  },
  plugins: [animatePlugin, typographyPlugin],
};
export default config;
