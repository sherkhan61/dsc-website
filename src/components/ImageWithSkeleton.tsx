import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../styles/GlobalStyles";

interface ImageWithSkeletonProps {
  src: string;
  alt?: string;
  className?: string;
}

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SkeletonLoader = styled.div<{ $isLoading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${theme.colors.surface} 0%,
    ${theme.colors.surfaceHover} 50%,
    ${theme.colors.surface} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  opacity: ${props => props.$isLoading ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
`;

const StyledImage = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.$isLoaded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`;

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt = "",
  className
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <SkeletonContainer className={className}>
      <SkeletonLoader $isLoading={!isLoaded} />
      <StyledImage
        src={src}
        alt={alt}
        onLoad={handleLoad}
        $isLoaded={isLoaded}
      />
    </SkeletonContainer>
  );
};

export default ImageWithSkeleton;
