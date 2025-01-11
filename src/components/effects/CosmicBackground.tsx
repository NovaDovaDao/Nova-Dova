// src/components/effects/CosmicBackground.tsx
import React, { useRef } from 'react';
import { useWebGL } from '../../hooks/useWebGL';
import cosmicShader from '../../assets/shaders/cosmic-kaleidoscope.frag?raw';

interface CosmicBackgroundProps {
  className?: string;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useWebGL(containerRef, {
    fragmentShader: cosmicShader,
  });

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
    />
  );
};