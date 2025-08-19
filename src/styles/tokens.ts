/**
 * Design Tokens - Converted from NHS UK Design System
 * Colors, typography, spacing, and other design constants
 */

// Color palette (converted from NHS UK SCSS variables)
export const colors = {
  // Primary colors
  primary: '#005eb8',      // from $color_nhsuk-blue
  white: '#ffffff',        // from $color_nhsuk-white
  black: '#212b32',        // from $color_nhsuk-black
  green: '#007f3b',        // from $color_nhsuk-green
  purple: '#330072',       // from $color_nhsuk-purple
  darkPink: '#7c2855',     // from $color_nhsuk-dark-pink
  red: '#d5281b',          // from $color_nhsuk-red
  yellow: '#ffeb3b',       // from $color_nhsuk-yellow

  // Secondary colors
  darkBlue: '#003087',     // from $color_nhsuk-dark-blue
  paleYellow: '#fff9c4',   // from $color_nhsuk-pale-yellow
  warmYellow: '#ffb81c',   // from $color_nhsuk-warm-yellow
  orange: '#ed8b00',       // from $color_nhsuk-orange
  aquaGreen: '#00a499',    // from $color_nhsuk-aqua-green
  pink: '#ae2573',         // from $color_nhsuk-pink

  // Greyscale
  grey1: '#4c6272',        // from $color_nhsuk-grey-1
  grey2: '#768692',        // from $color_nhsuk-grey-2
  grey3: '#aeb7bd',        // from $color_nhsuk-grey-3
  grey4: '#d8dde0',        // from $color_nhsuk-grey-4
  grey5: '#f0f4f5',        // from $color_nhsuk-grey-5
  
  // Semantic shortcuts (commonly used in components)
  text: '#212b32',         // maps to black for text content
  border: '#aeb7bd',       // maps to grey3 for borders
  secondary: '#4c6272',    // maps to grey1 for secondary text
  focus: '#ffeb3b',        // maps to yellow for focus states
  error: '#d5281b',        // maps to red for error states
  background: '#ffffff',   // maps to white for backgrounds
  textMuted: '#768692',    // maps to grey2 for muted text
  backgroundMuted: '#f0f4f5', // maps to grey5 for muted backgrounds
  visited: '#330072',      // maps to purple for visited links
  focusHover: '#fff9c4',   // maps to paleYellow for focus hover states
  primaryHover: '#003087', // maps to darkBlue for primary hover states
  backgroundLight: '#d8dde0', // maps to grey4 for light backgrounds
  backgroundHover: '#aeb7bd', // maps to grey3 for hover backgrounds
} as const;

// Semantic color assignments
export const semanticColors = {
  text: {
    primary: colors.black,
    secondary: colors.grey1,
    inverse: colors.white,
  },
  background: {
    primary: colors.white,
    secondary: colors.grey5,
    inverse: colors.primary,
  },
  border: {
    primary: colors.grey3,
    secondary: colors.grey4,
    focus: colors.yellow,
  },
  state: {
    success: colors.green,
    warning: colors.orange,
    error: colors.red,
    info: colors.primary,
  },
  interactive: {
    primary: colors.primary,
    secondary: colors.grey1,
    hover: colors.darkBlue,
    active: colors.darkBlue,
    disabled: colors.grey3,
  },
} as const;

// Typography scale
export const typography = {
  fontFamily: {
    base: '"Frutiger W01", "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
} as const;

// Spacing scale (based on 4px grid)
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
} as const;

// Breakpoints (mobile-first)
export const breakpoints = {
  sm: '480px',    // Small devices
  md: '768px',    // Tablets
  lg: '1024px',   // Desktop
  xl: '1280px',   // Large desktop
  '2xl': '1536px', // Extra large desktop
} as const;

// Media queries
export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
} as const;

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// Box shadows
export const boxShadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  focus: `0 0 0 3px ${colors.yellow}`,
  none: 'none',
} as const;

// Animation durations
export const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// Export complete theme object
export const theme = {
  colors,
  semanticColors,
  typography,
  spacing,
  breakpoints,
  media,
  zIndex,
  borderRadius,
  boxShadow,
  animation,
} as const;

export type Theme = typeof theme;