import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './apps/web/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#08090B',
        secondaryBg: '#101216',
        elevatedSurface: 'rgba(255, 255, 255, 0.055)',
        glassBorder: 'rgba(255, 255, 255, 0.12)',
        primaryText: '#F5F5F5',
        secondaryText: '#A3A6AC',
        accentChampagne: '#C5B39E',
        accentElectricBlue: '#3B82F6',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
        space: ['var(--font-space-grotesk)', 'monospace'],
        display: ['var(--font-display)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
