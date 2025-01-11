// src/components/effects/LoadingTransition.tsx
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import loaderShader from '../../assets/shaders/loader.frag?raw';
import { useWebGL } from '../../hooks/useWebGL';
import { useTransition } from '../../context/TransitionContext';

interface LoadingTransitionProps {
  initialLoading?: boolean;
}

export const LoadingTransition: React.FC<LoadingTransitionProps> = ({ 
  initialLoading = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(initialLoading);
  const { isTransitioning } = useTransition();

  // Immediately set visibility based on props
  useEffect(() => {
    setIsVisible(initialLoading || isTransitioning);
  }, [initialLoading, isTransitioning]);

  // Setup WebGL effect
  useWebGL(containerRef, {
    fragmentShader: loaderShader,
  });

  // If not visible, don't render anything
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black"
    >
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple"
        >
          NOVA DOVA DAO
          <div className="mt-4 text-sm text-gray-400">
            {initialLoading ? 'Loading' : 'Transitioning'}
            <span className="inline-block animate-bounce">...</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};