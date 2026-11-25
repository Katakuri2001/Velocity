import type { Config } from 'tailwindcss'

/**
 * Velocity design tokens — high-end premium.
 * Dark cinematic surfaces, champagne gold accents, serif display type.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette (source of truth)
        ink: '#050505',
        surface: '#0a0a0a',
        surfaceRaised: '#111111',
        card: '#141414',
        hairline: '#262626',
        primary: '#f5f5f4',
        muted: '#a1a1aa',
        gold: '#c9a86a',
        goldHover: '#d4af7a',
        // Back-compat aliases used by shared/admin UI
        primaryBg: '#050505',
        secondaryBg: '#0a0a0a',
        elevatedSurface: '#111111',
        glassBorder: '#262626',
        primaryText: '#f5f5f4',
        secondaryText: '#a1a1aa',
        accentChampagne: '#c9a86a',
        accentElectricBlue: '#c9a86a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        manrope: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        space: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      maxWidth: {
        shell: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
