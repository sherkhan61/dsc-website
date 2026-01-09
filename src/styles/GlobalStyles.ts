/**
 * Global styles and theme configuration
 * Design inspired by resend.com - dark, minimal, corporate
 */

import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    // Dark theme inspired by resend.com
    background: "#0a0a0a",
    surface: "#111111",
    surfaceHover: "#1a1a1a",
    border: "#222222",
    borderHover: "#333333",
    
    // Text colors
    text: "#ffffff",
    textSecondary: "#a0a0a0",
    textTertiary: "#666666",
    
    // Brand colors - modern green accent
    primary: "#00ff88",
    primaryHover: "#00dd77",
    primaryMuted: "#00ff8820",
    
    // Additional colors
    accent: "#0066ff",
    accentHover: "#0055ee",
    error: "#ff4444",
    success: "#00ff88",
    warning: "#ffaa00",
    
    // Gradients
    gradientPrimary: "linear-gradient(135deg, #00ff88 0%, #00dd77 100%)",
    gradientAccent: "linear-gradient(135deg, #0066ff 0%, #0055ee 100%)",
    gradientBg: "linear-gradient(180deg, #0a0a0a 0%, #000000 100%)",
  },
  
  fonts: {
    // Using system fonts for performance and unique character
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
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    glow: "0 0 20px rgba(0, 255, 136, 0.3)",
    glowAccent: "0 0 20px rgba(0, 102, 255, 0.3)",
  },
  
  borderRadius: {
    sm: "0.25rem",   // 4px
    base: "0.5rem",  // 8px
    md: "0.75rem",   // 12px
    lg: "1rem",      // 16px
    xl: "1.5rem",    // 24px
    full: "9999px",
  },
  
  zIndex: {
    base: 0,
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
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
    color: ${theme.colors.primary};
  }

  pre {
    font-family: ${theme.fonts.mono};
    font-size: 0.875rem;
    padding: ${theme.spacing.md};
    background: ${theme.colors.surface};
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
    background: ${theme.colors.surface};
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
