import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";

const HeaderWrapper = styled.header<{ $isScrolled: boolean; $menuOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.$menuOpen ? theme.zIndex.modal + 10 : theme.zIndex.sticky};
  background: ${props => props.$isScrolled ? theme.colors.surfaceGlass : "transparent"};
  backdrop-filter: ${props => props.$isScrolled ? "blur(20px) saturate(180%)" : "none"};
  border-bottom: ${props => props.$isScrolled ? `1px solid ${theme.colors.border}` : "none"};
  transition: all ${theme.transitions.normal};
  box-shadow: ${props => props.$isScrolled ? theme.shadows.md : "none"};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }
`;

const Logo = styled(Link as any)`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  color: ${theme.colors.text};
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: color ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    color: ${theme.colors.primary};
  }

  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    background: ${theme.colors.primary};
    border-radius: 50%;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.1);
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.xl};
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.desktop}) {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    max-width: 80vw;
    height: 100vh;
    height: 100dvh; /* Dynamic viewport height for mobile browsers */
    background: ${theme.colors.background};
    border-left: 1px solid ${theme.colors.primary};
    box-shadow: -4px 0 24px rgba(0, 255, 136, 0.1);
    flex-direction: column;
    align-items: flex-start;
    padding: ${theme.spacing["3xl"]} ${theme.spacing.xl};
    gap: ${theme.spacing.md};
    transform: ${props => props.$isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform ${theme.transitions.normal};
    z-index: ${theme.zIndex.modal};
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
`;

const NavLink = styled(Link as any)`
  font-size: ${theme.fontSizes.base};
  font-weight: 500;
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${theme.transitions.fast};
  position: relative;

  &:hover {
    color: ${theme.colors.text};
  }

  &.active {
    color: ${theme.colors.primary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${theme.colors.primary};
    transform: scaleX(0);
    transition: transform ${theme.transitions.fast};
  }

  &:hover::after,
  &.active::after {
    transform: scaleX(1);
  }

  @media (max-width: ${theme.breakpoints.desktop}) {
    font-size: ${theme.fontSizes.lg};
  }
`;

const ContactButton = styled(Link as any)`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  transition: background ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.primaryHover};
    box-shadow: ${theme.shadows.glow};
    color: ${theme.colors.text};
  }

  @media (max-width: ${theme.breakpoints.desktop}) {
    width: 100%;
    text-align: center;
  }
`;

const MenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  z-index: ${theme.zIndex.modal + 1};

  @media (max-width: ${theme.breakpoints.desktop}) {
    display: flex;
  }

  span {
    width: 24px;
    height: 2px;
    background: ${theme.colors.text};
    transition: all ${theme.transitions.fast};
    border-radius: ${theme.borderRadius.full};
  }

  &[aria-expanded="true"] {
    span:nth-child(1) {
      transform: rotate(45deg) translateY(7px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translateY(-7px);
    }
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: ${theme.breakpoints.desktop}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    opacity: ${props => props.$isOpen ? 1 : 0};
    visibility: ${props => props.$isOpen ? "visible" : "hidden"};
    pointer-events: ${props => props.$isOpen ? "all" : "none"};
    transition: opacity ${theme.transitions.normal}, visibility ${theme.transitions.normal};
    z-index: ${theme.zIndex.fixed};
  }
`;

interface HeaderProps {
  pathname?: string;
}

const Header: React.FC<HeaderProps> = ({ pathname = "/" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const preventScrollRef = useRef<((e: TouchEvent) => void) | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close menu on route change
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Prevent scroll when menu is open
    if (isMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.setAttribute('data-scroll-lock', scrollY.toString());

      // Lock scroll with overflow hidden only
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // For iOS Safari - prevent touch move on body
      // Store function reference so we can properly remove it later
      preventScrollRef.current = (e: TouchEvent) => {
        // Allow scrolling inside Nav menu, prevent on everything else
        const target = e.target as HTMLElement;
        if (!target.closest('nav')) {
          e.preventDefault();
        }
      };

      document.body.addEventListener('touchmove', preventScrollRef.current, { passive: false });
    } else {
      // Restore scroll
      const scrollY = document.body.getAttribute('data-scroll-lock');

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.removeAttribute('data-scroll-lock');

      // Remove touch listener using the stored reference
      if (preventScrollRef.current) {
        document.body.removeEventListener('touchmove', preventScrollRef.current);
        preventScrollRef.current = null;
      }

      // Restore scroll position if needed
      if (scrollY) {
        const currentScroll = window.scrollY;
        const savedScroll = parseInt(scrollY);
        if (Math.abs(currentScroll - savedScroll) > 10) {
          window.scrollTo(0, savedScroll);
        }
      }
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.removeAttribute('data-scroll-lock');

      // Remove listener if still attached
      if (preventScrollRef.current) {
        document.body.removeEventListener('touchmove', preventScrollRef.current);
        preventScrollRef.current = null;
      }
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: "Главная", path: "/" },
    { label: "О нас", path: "/about" },
    { label: "Клиентам", path: "/clients" },
  ];

  return (
    <>
      <Overlay
        $isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <HeaderWrapper $isScrolled={isScrolled} $menuOpen={isMenuOpen}>
        <Container>
          <Logo to="/" aria-label="Digital Security Center - Главная">
            Центр цифровой безопасности
          </Logo>

          <Nav $isOpen={isMenuOpen} role="navigation" aria-label="Основная навигация">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={pathname === item.path ? "active" : ""}
                aria-current={pathname === item.path ? "page" : undefined}
              >
                {item.label}
              </NavLink>
            ))}
            <ContactButton to="/contacts">Связаться с нами</ContactButton>
          </Nav>

          <MenuButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
          >
            <span />
            <span />
            <span />
          </MenuButton>
        </Container>
      </HeaderWrapper>
    </>
  );
};

export default Header;
