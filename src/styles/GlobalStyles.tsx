import { createGlobalStyle } from 'styled-components';
import { theme } from './tokens';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset and Base Styles */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    font-family: ${theme.typography.fontFamily.base};
  }

  body {
    margin: 0;
    font-family: ${theme.typography.fontFamily.base};
    font-size: ${theme.typography.fontSize.base};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.semanticColors.text.primary};
    background-color: ${theme.semanticColors.background.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Accessibility: Respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Focus styles for accessibility */
  :focus-visible {
    outline: 3px solid ${theme.colors.yellow};
    outline-offset: 2px;
  }

  /* Hide focus outline for mouse users */
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Typography defaults */
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 ${theme.spacing[4]} 0;
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeight.tight};
  }

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    ${theme.media.md} {
      font-size: ${theme.typography.fontSize['5xl']};
    }
  }

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    ${theme.media.md} {
      font-size: ${theme.typography.fontSize['4xl']};
    }
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
    ${theme.media.md} {
      font-size: ${theme.typography.fontSize['3xl']};
    }
  }

  h4 {
    font-size: ${theme.typography.fontSize.xl};
    ${theme.media.md} {
      font-size: ${theme.typography.fontSize['2xl']};
    }
  }

  h5 {
    font-size: ${theme.typography.fontSize.lg};
    ${theme.media.md} {
      font-size: ${theme.typography.fontSize.xl};
    }
  }

  h6 {
    font-size: ${theme.typography.fontSize.base};
    ${theme.media.md} {
      font-size: ${theme.typography.fontSize.lg};
    }
  }

  p {
    margin: 0 0 ${theme.spacing[4]} 0;
  }

  /* List styles */
  ul, ol {
    margin: 0 0 ${theme.spacing[4]} 0;
    padding-left: ${theme.spacing[6]};
  }

  li {
    margin-bottom: ${theme.spacing[1]};
  }

  /* Link styles */
  a {
    color: ${theme.semanticColors.interactive.primary};
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 2px;

    &:hover {
      color: ${theme.semanticColors.interactive.hover};
      text-decoration-thickness: 3px;
    }

    &:focus {
      outline: 3px solid ${theme.colors.yellow};
      outline-offset: 2px;
      background-color: ${theme.colors.yellow};
      color: ${theme.colors.black};
    }

    &:active {
      color: ${theme.semanticColors.interactive.active};
    }
  }

  /* Form elements base styles */
  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  /* Table styles */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    text-align: left;
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
    border-bottom: 1px solid ${theme.semanticColors.border.primary};
  }

  th {
    font-weight: ${theme.typography.fontWeight.bold};
    background-color: ${theme.semanticColors.background.secondary};
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: ${theme.colors.yellow};
    color: ${theme.colors.black};
    padding: ${theme.spacing[2]} ${theme.spacing[4]};
    text-decoration: none;
    z-index: ${theme.zIndex.modal};

    &:focus {
      top: 6px;
    }
  }

  /* Print styles */
  @media print {
    *,
    *::before,
    *::after {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]::after {
      content: " (" attr(href) ")";
    }

    thead {
      display: table-header-group;
    }

    tr,
    img {
      page-break-inside: avoid;
    }

    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }
  }

  /* RTL support */
  [dir="rtl"] {
    text-align: right;
  }

  [dir="rtl"] ul,
  [dir="rtl"] ol {
    padding-left: 0;
    padding-right: ${theme.spacing[6]};
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    * {
      border-color: CanvasText;
    }

    button,
    a {
      border: 2px solid;
    }
  }
`;