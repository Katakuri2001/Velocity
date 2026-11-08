export const designTokens = {
  colors: {
    primaryBg: '#08090B',
    secondaryBg: '#101216',
    elevatedSurface: 'rgba(255, 255, 255, 0.055)',
    glassBorder: 'rgba(255, 255, 255, 0.12)',
    primaryText: '#F5F5F5',
    secondaryText: '#A3A6AC',
    accentChampagne: '#C5B39E',
    accentElectricBlue: '#3B82F6',
  } as const,
  fonts: {
    sans: 'var(--font-inter)',
    manrope: 'var(--font-manrope)',
    space: 'var(--font-space-grotesk)',
    display: 'var(--font-display)',
  } as const,
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  } as const,
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  } as const,
  motion: {
    easing: {
      easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
  } as const,
} as const

export type DesignTokens = typeof designTokens
