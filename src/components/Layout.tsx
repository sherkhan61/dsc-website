import React from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles } from "../styles/GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  pathname?: string;
}

/**
 * Layout Component
 * Provides global theme, styles, and structure for all pages
 */
const Layout: React.FC<LayoutProps> = ({ children, pathname }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header pathname={pathname} />
      <main 
        style={{ 
          minHeight: "100vh", 
          paddingTop: "80px" // Offset for fixed header
        }}
      >
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
