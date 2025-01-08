import * as THREE from 'three';
import { IEffect } from '../interfaces/IEffect';

export class BackgroundEffect implements IEffect {
    private material: THREE.ShaderMaterial;
    private mesh: THREE.Mesh;
    private mousePosition: THREE.Vector2;

    constructor(fragmentShader: string) {
        this.mousePosition = new THREE.Vector2(0, 0);

        // Create shader material
        this.material = new THREE.ShaderMaterial({
            fragmentShader,
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            uniforms: {
                iResolution: { value: new THREE.Vector3() },
                iTime: { value: 0 },
                iMouse: { value: this.mousePosition }
            }
        });

        // Create full-screen quad
        const geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.frustumCulled = false;

        // Setup event listeners
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        window.addEventListener('mousemove', (event) => {
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = window.innerHeight - event.clientY; // Flip Y coordinate
        });

        window.addEventListener('resize', () => {
            this.updateResolution();
        });

        // Initial resolution setup
        this.updateResolution();
    }

    private updateResolution(): void {
        if (this.material.uniforms.iResolution) {
            this.material.uniforms.iResolution.value.set(
                window.innerWidth,
                window.innerHeight,
                1.0
            );
        }
    }

    public update(deltaTime: number, time: number): void {
        if (this.material.uniforms.iTime) {
            this.material.uniforms.iTime.value = time;
        }
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

    public dispose(): void {
        this.material.dispose();
        this.mesh.geometry.dispose();
        
        // Clean up event listeners
        window.removeEventListener('mousemove', this.setupEventListeners);
        window.removeEventListener('resize', this.updateResolution);
    }
}