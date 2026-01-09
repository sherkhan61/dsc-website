import React from "react";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";

/**
 * Gradient Background component with large central ellipse
 * Inspired by bolt.new design
 */

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${theme.zIndex.background};
  overflow: hidden;
  pointer-events: none;
`;

// Large central ellipse with gradient
const CentralEllipse = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1400px;
  height: 1400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${theme.colors.gradientPurple} 0%,
    ${theme.colors.gradientBlue} 25%,
    ${theme.colors.gradientCyan} 50%,
    transparent 70%
  );
  filter: blur(120px);
  opacity: 0.6;
  animation: pulse 8s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
      opacity: 0.8;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 900px;
    height: 900px;
    filter: blur(80px);
  }
`;

// Secondary ellipse for depth
const SecondaryEllipse = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 1000px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${theme.colors.gradientGreen} 0%,
    ${theme.colors.accentPurple} 40%,
    transparent 70%
  );
  filter: blur(100px);
  opacity: 0.4;
  animation: floatSlow 12s ease-in-out infinite;

  @keyframes floatSlow {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -60%) scale(1.05);
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 700px;
    height: 700px;
    filter: blur(70px);
  }
`;

// Accent ellipse on the side
const AccentEllipse = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.$position}: -200px;
  transform: translateY(-50%);
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${props => props.$position === 'left' ? theme.colors.gradientPink : theme.colors.gradientCyan} 0%,
    transparent 60%
  );
  filter: blur(100px);
  opacity: 0.3;
  animation: float 15s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(-50%);
    }
    50% {
      transform: translateY(-45%);
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 500px;
    height: 500px;
    filter: blur(60px);
  }
`;

// Gradient overlay for smooth fade
const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(10, 10, 15, 0.3) 40%,
    rgba(10, 10, 15, 0.7) 70%,
    rgba(10, 10, 15, 0.9) 100%
  );
  z-index: 1;
`;

const GradientBackground: React.FC = () => {
  return (
    <BackgroundWrapper>
      {/* Large central gradient ellipse */}
      <CentralEllipse />

      {/* Secondary ellipse for depth */}
      <SecondaryEllipse />

      {/* Accent ellipses on sides */}
      <AccentEllipse $position="left" />
      <AccentEllipse $position="right" />

      {/* Radial gradient overlay */}
      <Gradient />
    </BackgroundWrapper>
  );
};

export default GradientBackground;
