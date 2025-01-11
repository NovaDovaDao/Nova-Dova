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

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      stencil: false,
      depth: false
    });

    // Setup scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.z = 1;

    // Create geometry and material
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
        iMouse: { value: new THREE.Vector2() },
        ...options.uniforms
      },
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Initial setup
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Store refs
    rendererRef.current = renderer;
    sceneRef.current = scene;
    materialRef.current = material;

    // Animation
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      if (material.uniforms.iTime) {
        material.uniforms.iTime.value = time;
      }
      if (material.uniforms.iResolution) {
        material.uniforms.iResolution.value.set(
          window.innerWidth * window.devicePixelRatio,
          window.innerHeight * window.devicePixelRatio,
          1
        );
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (material.uniforms.iResolution) {
        material.uniforms.iResolution.value.set(
          window.innerWidth * window.devicePixelRatio,
          window.innerHeight * window.devicePixelRatio,
          1
        );
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
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