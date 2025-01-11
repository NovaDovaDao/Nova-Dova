// src/hooks/useCosmicEffect.ts
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CosmicBackgroundEffect } from '../effects/CosmicBackgroundEffect';
import { useWebGLContext } from '../context/WebGLContext';

export const useCosmicEffect = () => {
  const effectRef = useRef<CosmicBackgroundEffect | null>(null);
  const { scene } = useWebGLContext();

  useEffect(() => {
    if (!scene) return;

    // Create and add cosmic effect
    const effect = new CosmicBackgroundEffect();
    effectRef.current = effect;
    scene.add(effect.getMesh());

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.016; // Approximately 60 FPS
      effect.update(0.016, time);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (effectRef.current) {
        scene.remove(effectRef.current.getMesh());
        effectRef.current.dispose();
      }
    };
  }, [scene]);

  return effectRef.current;
};