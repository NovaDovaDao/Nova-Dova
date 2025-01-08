// src/ts/effects/CosmicBackgroundEffect.ts
import * as THREE from 'three';
import { IEffect } from '../interfaces/IEffect';

export class CosmicBackgroundEffect implements IEffect {
    private material: THREE.ShaderMaterial;
    private mesh: THREE.Mesh;
    private mousePosition: THREE.Vector2;
    private resolution: THREE.Vector3;

    constructor(fragmentShader: string) {
        this.mousePosition = new THREE.Vector2(0, 0);
        this.resolution = new THREE.Vector3(
            window.innerWidth * window.devicePixelRatio,
            window.innerHeight * window.devicePixelRatio,
            1.0
        );

        // Create shader material with improved settings
        this.material = new THREE.ShaderMaterial({
            fragmentShader,
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            uniforms: {
                iResolution: { value: this.resolution },
                iTime: { value: 0 },
                iMouse: { value: this.mousePosition }
            },
            transparent: true,
            depthWrite: false,
            depthTest: false
        });

        // Create full-screen quad
        const geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.frustumCulled = false;
        this.mesh.position.z = -1; // Ensure it's behind everything

        // Setup events
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        const handleMouseMove = (event: MouseEvent) => {
            this.mousePosition.x = event.clientX * window.devicePixelRatio;
            this.mousePosition.y = (window.innerHeight - event.clientY) * window.devicePixelRatio;
        };

        const handleResize = () => {
            this.resolution.set(
                window.innerWidth * window.devicePixelRatio,
                window.innerHeight * window.devicePixelRatio,
                1.0
            );
            this.material.uniforms.iResolution.value = this.resolution;
        };

        window.addEventListener('mousemove', handleMouseMove, false);
        window.addEventListener('resize', handleResize, false);

        // Initial resolution set
        handleResize();
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
        window.removeEventListener('mousemove', this.setupEventListeners);
        window.removeEventListener('resize', this.setupEventListeners);
    }
}