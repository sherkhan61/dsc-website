import React from "react";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";

/**
 * Gradient Background component with large central ellipse
 * Inspired by bolt.new design with rim glow effect
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

// Large central ellipse with rim glow (bright edges, dark center)
const CentralEllipse = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1800px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    transparent 0%,
    transparent 30%,
    ${theme.colors.gradientBlue}CC 60%,
    ${theme.colors.gradientCyan}FF 80%,
    ${theme.colors.gradientBlue}DD 100%
  );
  filter: blur(60px);
  opacity: 1;
  animation: pulse 8s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
      opacity: 0.9;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 1200px;
    height: 500px;
    filter: blur(40px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 900px;
    height: 400px;
    filter: blur(30px);
  }
`;

// Additional glow layer for stronger rim effect
const GlowLayer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1900px;
  height: 750px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    transparent 0%,
    transparent 40%,
    ${theme.colors.gradientCyan}AA 70%,
    ${theme.colors.gradientBlue}CC 90%,
    transparent 100%
  );
  filter: blur(80px);
  opacity: 0.8;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 1300px;
    height: 550px;
    filter: blur(50px);
  }
`;

// Gradient overlay for smooth fade to dark edges (very subtle)
const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 120% 60% at 50% 50%,
    transparent 0%,
    transparent 40%,
    rgba(10, 10, 15, 0.3) 70%,
    rgba(10, 10, 15, 0.7) 90%,
    rgba(10, 10, 15, 0.9) 100%
  );
  z-index: 1;
`;

const GradientBackground: React.FC = () => {
  return (
    <BackgroundWrapper>
      {/* Large central ellipse with rim glow */}
      <CentralEllipse />

      {/* Additional glow layer */}
      <GlowLayer />

      {/* Radial gradient overlay */}
      <Gradient />
    </BackgroundWrapper>
  );
};

export default GradientBackground;
