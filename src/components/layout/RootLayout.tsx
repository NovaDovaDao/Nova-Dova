// src/components/layout/RootLayout.tsx
import React, { useRef, useEffect } from 'react';
import { useWebGL } from '../../hooks/useWebGL';
import cosmicShader from '../../assets/shaders/cosmic-kaleidoscope.frag?raw';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { renderer, material } = useWebGL(containerRef, {
    fragmentShader: cosmicShader,
  });

  useEffect(() => {
    if (containerRef.current && renderer) {
      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (material?.uniforms.iResolution) {
          material.uniforms.iResolution.value.set(
            window.innerWidth * window.devicePixelRatio,
            window.innerHeight * window.devicePixelRatio,
            1
          );
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [renderer, material]);

  return (
    <div className="min-h-screen relative">
      {/* Fixed cosmic background - lowest z-index */}
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-0 bg-black"
        style={{ pointerEvents: 'none' }}
      />

      {/* Main content layer - middle z-index */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};