// src/context/WebGLContext.tsx
import { createContext, useContext, useState, useCallback } from 'react';
import * as THREE from 'three';

interface WebGLContextType {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  updateShader: (shader: string) => void;
}

const WebGLContext = createContext<WebGLContextType | null>(null);

export const WebGLProvider = ({ children }) => {
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  const updateShader = useCallback((shader: string) => {
    // Shader update logic
  }, []);

  return (
    <WebGLContext.Provider value={{ renderer, scene, updateShader }}>
      {children}
    </WebGLContext.Provider>
  );
};

export const useWebGLContext = () => {
  const context = useContext(WebGLContext);
  if (!context) {
    throw new Error('useWebGLContext must be used within a WebGLProvider');
  }
  return context;
};