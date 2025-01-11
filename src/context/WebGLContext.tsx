// src/context/WebGLContext.tsx
import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface WebGLContextType {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
  updateShader: (shader: string) => void;
  setSize: (width: number, height: number) => void;
  addToScene: (object: THREE.Object3D) => void;
  removeFromScene: (object: THREE.Object3D) => void;
}

const WebGLContext = createContext<WebGLContextType | null>(null);

export const WebGLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [scene] = useState(() => new THREE.Scene());
  const [camera] = useState(() => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    return new THREE.OrthographicCamera(
      -aspectRatio, aspectRatio,
      1, -1,
      0.1, 100
    );
  });

  useEffect(() => {
    const newRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      stencil: false,
      depth: false,
    });

    newRenderer.setSize(window.innerWidth, window.innerHeight);
    newRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    setRenderer(newRenderer);

    camera.position.z = 1;

    const handleResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const orthoCamera = camera as THREE.OrthographicCamera;
      orthoCamera.left = -aspectRatio;
      orthoCamera.right = aspectRatio;
      orthoCamera.updateProjectionMatrix();
      newRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      newRenderer.dispose();
    };
  }, [camera]);

  const updateShader = (shader: string) => {
    // Shader update logic here
  };

  const setSize = (width: number, height: number) => {
    if (renderer) {
      renderer.setSize(width, height);
    }
  };

  const addToScene = (object: THREE.Object3D) => {
    scene.add(object);
  };

  const removeFromScene = (object: THREE.Object3D) => {
    scene.remove(object);
  };

  return (
    <WebGLContext.Provider 
      value={{ 
        renderer, 
        scene, 
        camera, 
        updateShader, 
        setSize, 
        addToScene, 
        removeFromScene 
      }}
    >
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