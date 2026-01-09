/**
 * Global styles and theme configuration
 * Design inspired by bolt.new - modern, gradient ellipses, glassmorphism
 */

import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    // Dark theme with vibrant accents (bolt.new style)
    background: "#000000",
    backgroundLight: "#0a0a0f",
    surface: "rgba(20, 20, 30, 0.5)",
    surfaceHover: "rgba(30, 30, 45, 0.7)",
    surfaceGlass: "rgba(20, 20, 30, 0.4)",
    border: "rgba(100, 100, 150, 0.2)",
    borderHover: "rgba(100, 100, 200, 0.4)",

    // Text colors
    text: "#ffffff",
    textSecondary: "#b4b4c8",
    textTertiary: "#808090",

    // Brand colors - vibrant gradients
    primary: "#00ff88",
    primaryHover: "#00dd77",
    primaryMuted: "rgba(0, 255, 136, 0.1)",

    // Accent colors for gradients
    accent: "#0066ff",
    accentPurple: "#a855f7",
    accentCyan: "#06b6d4",
    accentPink: "#ec4899",

    // Status colors
    error: "#ff4444",
    success: "#00ff88",
    warning: "#ffaa00",

    // Gradient colors for ellipses
    gradientBlue: "#0066ff",
    gradientPurple: "#a855f7",
    gradientCyan: "#06b6d4",
    gradientGreen: "#00ff88",
    gradientPink: "#ec4899",

    // Gradients
    gradientPrimary: "linear-gradient(135deg, #00ff88 0%, #00dd77 100%)",
    gradientAccent: "linear-gradient(135deg, #0066ff 0%, #a855f7 100%)",
    gradientBg: "linear-gradient(180deg, #0a0a0f 0%, #000000 100%)",
    gradientMulti: "linear-gradient(135deg, #0066ff 0%, #a855f7 50%, #ec4899 100%)",
  },

  fonts: {
    display: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Source Code Pro', monospace",
  },

  fontSizes: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "2rem",    // 32px
    "4xl": "2.5rem",  // 40px
    "5xl": "3rem",    // 48px
    "6xl": "4rem",    // 64px
    "7xl": "5rem",    // 80px
  },

  breakpoints: {
    mobile: "640px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
    ultraWide: "1536px",
  },

  spacing: {
    xs: "0.25rem",   // 4px
    sm: "0.5rem",    // 8px
    md: "1rem",      // 16px
    lg: "1.5rem",    // 24px
    xl: "2rem",      // 32px
    "2xl": "3rem",   // 48px
    "3xl": "4rem",   // 64px
    "4xl": "6rem",   // 96px
    "5xl": "8rem",   // 128px
  },

  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
    glow: "0 0 30px rgba(0, 255, 136, 0.4), 0 0 60px rgba(0, 255, 136, 0.2)",
    glowAccent: "0 0 30px rgba(0, 102, 255, 0.4), 0 0 60px rgba(0, 102, 255, 0.2)",
    glowPurple: "0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)",
  },

  borderRadius: {
    sm: "0.25rem",   // 4px
    base: "0.5rem",  // 8px
    md: "0.75rem",   // 12px
    lg: "1rem",      // 16px
    xl: "1.5rem",    // 24px
    "2xl": "2rem",   // 32px
    full: "9999px",
  },

  zIndex: {
    base: 0,
    background: -1,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
};

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset and Base Styles */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.base};
    line-height: 1.6;
    color: ${theme.colors.text};
    background: ${theme.colors.background};
    overflow-x: hidden;
    position: relative;

    /* Prevent text size adjustment on mobile */
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.display};
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: ${theme.colors.text};
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 5rem);
    margin-bottom: ${theme.spacing.lg};
  }

  h2 {
    font-size: clamp(2rem, 4vw, 4rem);
    margin-bottom: ${theme.spacing.md};
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 3rem);
    margin-bottom: ${theme.spacing.md};
  }

  h4 {
    font-size: clamp(1.25rem, 2vw, 2rem);
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.textSecondary};
    line-height: 1.7;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.primaryHover};
    }

    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
      border-radius: ${theme.borderRadius.sm};
    }
  }

  /* Lists */
  ul, ol {
    padding-left: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.textSecondary};
  }

  li {
    margin-bottom: ${theme.spacing.xs};
  }

  /* Code */
  code {
    font-family: ${theme.fonts.mono};
    font-size: 0.9em;
    padding: 0.125rem 0.25rem;
    background: ${theme.colors.surfaceGlass};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
    color: ${theme.colors.primary};
  }

  pre {
    font-family: ${theme.fonts.mono};
    font-size: 0.875rem;
    padding: ${theme.spacing.md};
    background: ${theme.colors.surfaceGlass};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${theme.spacing.md};

    code {
      padding: 0;
      background: none;
      border: none;
    }
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Buttons */
  button {
    font-family: ${theme.fonts.body};
    cursor: pointer;
    border: none;
    background: none;

    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Inputs */
  input,
  textarea,
  select {
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.base};

    &:focus {
      outline: none;
    }
  }

  /* Accessibility */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Selection */
  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
  }

  ::-moz-selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundLight};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.full};

    &:hover {
      background: ${theme.colors.borderHover};
    }
  }

  /* Focus visible for keyboard navigation */
  *:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  /* Keyframe animations */
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -30px) scale(1.05);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.95);
    }
  }

  @keyframes floatSlow {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(-20px, 20px) rotate(3deg);
    }
    66% {
      transform: translate(20px, -20px) rotate(-3deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Smooth animations */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export type Theme = typeof theme;
