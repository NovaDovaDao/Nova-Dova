import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WebGLOptions {
  fragmentShader: string;
  vertexShader?: string;
  uniforms?: { [key: string]: THREE.IUniform };
}

export const useWebGL = (containerRef: React.RefObject<HTMLElement>, options: WebGLOptions) => {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup renderer with performance optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: false
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.autoClear = false;

    // Setup scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Create geometry and material with optimizations
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      fragmentShader: options.fragmentShader,
      vertexShader: options.vertexShader || `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3() },
        iMouse: { value: new THREE.Vector4() },
        ...options.uniforms
      },
      transparent: true,
      depthWrite: false,
      depthTest: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Initial setup
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      
      renderer.setSize(width, height);
      if (material.uniforms.iResolution) {
        material.uniforms.iResolution.value.set(
          width * pixelRatio,
          height * pixelRatio,
          1
        );
      }
    };

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Store refs
    rendererRef.current = renderer;
    sceneRef.current = scene;
    materialRef.current = material;

    // Animation with optimized timing
    const animate = () => {
      const currentTime = performance.now();
      const elapsedTime = (currentTime - startTimeRef.current) / 1000;
      
      if (material.uniforms.iTime) {
        material.uniforms.iTime.value = elapsedTime;
      }

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    // Handle mouse movement efficiently
    const handleMouseMove = (event: MouseEvent) => {
      if (material.uniforms.iMouse) {
        const mouseX = event.clientX * window.devicePixelRatio;
        const mouseY = event.clientY * window.devicePixelRatio;
        material.uniforms.iMouse.value.set(mouseX, mouseY, 0, 0);
      }
    };

    // Throttle resize events
    let resizeTimeout: number;
    const throttledResize = () => {
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
      resizeTimeout = window.requestAnimationFrame(handleResize);
    };

    handleResize();
    window.addEventListener('resize', throttledResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    frameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
      cancelAnimationFrame(resizeTimeout);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [options]);

  return {
    renderer: rendererRef.current,
    scene: sceneRef.current,
    material: materialRef.current
  };
};

export default useWebGL;