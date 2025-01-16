import React, { useRef, useEffect, memo } from 'react';
import { useWebGL } from '../../hooks/useWebGL';
import cosmicShader from '../../assets/shaders/cosmic-kaleidoscope.frag?raw';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = memo(({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { renderer, material } = useWebGL(containerRef, {
    fragmentShader: cosmicShader,
  });

  useEffect(() => {
    if (!containerRef.current || !renderer) return;

    let resizeTimeout: number;
    const handleResize = () => {
      if (resizeTimeout) {
        cancelAnimationFrame(resizeTimeout);
      }
      
      resizeTimeout = requestAnimationFrame(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        
        renderer.setSize(width, height);
        if (material?.uniforms.iResolution) {
          material.uniforms.iResolution.value.set(
            width * pixelRatio,
            height * pixelRatio,
            1
          );
        }
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(resizeTimeout);
    };
  }, [renderer, material]);

  return (
    <div className="min-h-screen relative">
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-0"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translate3d(0,0,0)',
          WebkitTransform: 'translate3d(0,0,0)'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

RootLayout.displayName = 'RootLayout';

export default RootLayout;