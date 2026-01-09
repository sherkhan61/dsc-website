import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";

const HeaderWrapper = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.sticky};
  background: ${props => props.$isScrolled ? "rgba(10, 10, 10, 0.95)" : "transparent"};
  backdrop-filter: none;
  border-bottom: ${props => props.$isScrolled ? `1px solid ${theme.colors.border}` : "none"};
  transition: all ${theme.transitions.normal};
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

const Logo = styled(Link)`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes["2xl"]};
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
    bottom: 0;
    width: 300px;
    max-width: 80vw;
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
  }
`;

const NavLink = styled(Link)`
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

const ContactButton = styled(Link)`
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
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: none;
    opacity: ${props => props.$isOpen ? 1 : 0};
    pointer-events: ${props => props.$isOpen ? "all" : "none"};
    transition: opacity ${theme.transitions.normal};
    z-index: ${theme.zIndex.modal - 1};
  }
`;

interface HeaderProps {
  pathname?: string;
}

const Header: React.FC<HeaderProps> = ({ pathname = "/" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const navItems = [
    { label: "Главная", path: "/" },
    { label: "О лаборатории", path: "/about" },
    { label: "Услуги", path: "/services" },
    { label: "Клиентам", path: "/clients" },
  ];

  return (
    <>
      <HeaderWrapper $isScrolled={isScrolled}>
        <Container>
          <Logo to="/" aria-label="Digital Security Center - Главная">
            ЦЦБ
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

      {isMenuOpen && (
        <Overlay
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
