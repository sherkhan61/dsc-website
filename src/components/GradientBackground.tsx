import React from "react";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";

/**
 * Gradient Background component with floating ellipses
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

const Ellipse = styled.div<{
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $size: string;
  $color: string;
  $delay?: string;
  $duration?: string;
}>`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  width: ${props => props.$size};
  height: ${props => props.$size};
  background: ${props => props.$color};

  ${props => props.$top && `top: ${props.$top};`}
  ${props => props.$left && `left: ${props.$left};`}
  ${props => props.$right && `right: ${props.$right};`}
  ${props => props.$bottom && `bottom: ${props.$bottom};`}

  animation: float ${props => props.$duration || '30s'} ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: calc(${props => props.$size} * 0.7);
    height: calc(${props => props.$size} * 0.7);
    filter: blur(60px);
  }
`;

const EllipseAlt = styled(Ellipse)`
  animation: floatSlow ${props => props.$duration || '40s'} ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 15, 0) 0%,
    rgba(10, 10, 15, 0.8) 50%,
    rgba(10, 10, 15, 0.95) 100%
  );
  z-index: 1;
`;

const GradientBackground: React.FC = () => {
  return (
    <BackgroundWrapper>
      {/* Blue ellipse - top left */}
      <Ellipse
        $top="-20%"
        $left="-10%"
        $size="800px"
        $color={theme.colors.gradientBlue}
        $duration="30s"
        $delay="0s"
      />

      {/* Purple ellipse - top right */}
      <EllipseAlt
        $top="10%"
        $right="-15%"
        $size="700px"
        $color={theme.colors.gradientPurple}
        $duration="35s"
        $delay="5s"
      />

      {/* Cyan ellipse - middle left */}
      <Ellipse
        $top="40%"
        $left="-5%"
        $size="600px"
        $color={theme.colors.gradientCyan}
        $duration="40s"
        $delay="10s"
      />

      {/* Green ellipse - center */}
      <EllipseAlt
        $top="50%"
        $right="30%"
        $size="500px"
        $color={theme.colors.gradientGreen}
        $duration="45s"
        $delay="3s"
      />

      {/* Pink ellipse - bottom right */}
      <Ellipse
        $bottom="-10%"
        $right="-5%"
        $size="650px"
        $color={theme.colors.gradientPink}
        $duration="38s"
        $delay="7s"
      />

      {/* Purple ellipse 2 - bottom left */}
      <EllipseAlt
        $bottom="5%"
        $left="10%"
        $size="550px"
        $color={theme.colors.gradientPurple}
        $duration="42s"
        $delay="12s"
      />

      {/* Blue ellipse 2 - center right */}
      <Ellipse
        $top="60%"
        $right="5%"
        $size="450px"
        $color={theme.colors.gradientBlue}
        $duration="36s"
        $delay="15s"
      />

      {/* Gradient overlay for smooth fade */}
      <Gradient />
    </BackgroundWrapper>
  );
};

export default GradientBackground;
