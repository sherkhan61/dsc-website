import React from "react";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";

/**
 * Gradient Background component - bolt.new style
 * Large horizontal ellipse with bright rim glow effect
 */

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`;

// Large central ellipse with bright rim glow
const CentralEllipse = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2400px;
  height: 900px;
  border-radius: 50%;

  /* Bright rim glow effect - similar to bolt.new */
  background: radial-gradient(
    ellipse closest-side,
    rgba(10, 10, 15, 0) 0%,
    rgba(10, 10, 15, 0) 20%,
    rgba(6, 182, 212, 0.4) 50%,
    rgba(6, 182, 212, 0.8) 75%,
    rgba(6, 182, 212, 1) 85%,
    rgba(0, 102, 255, 0.9) 92%,
    rgba(0, 102, 255, 0.4) 97%,
    transparent 100%
  );

  filter: blur(40px);
  opacity: 1;
  animation: pulse 8s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.03);
    }
  }

  @media (max-width: ${theme.breakpoints.desktop}) {
    width: 1800px;
    height: 700px;
    filter: blur(35px);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 1200px;
    height: 500px;
    filter: blur(30px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 900px;
    height: 400px;
    filter: blur(25px);
  }
`;

const GradientBackground: React.FC = () => {
  return (
    <BackgroundWrapper>
      <CentralEllipse />
    </BackgroundWrapper>
  );
};

export default GradientBackground;
