import * as THREE from 'three';
import { IEffect } from '../interfaces/IEffect';

export class CosmicBackgroundEffect implements IEffect {
    private material: THREE.ShaderMaterial;
    private mesh: THREE.Mesh;
    private resolution: THREE.Vector3;

    constructor(fragmentShader: string) {
        this.resolution = new THREE.Vector3(
            window.innerWidth * window.devicePixelRatio,
            window.innerHeight * window.devicePixelRatio,
            1.0
        );

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
                iMouse: { value: new THREE.Vector2(0, 0) }
            },
            transparent: true,
            depthWrite: false,
            depthTest: false
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.frustumCulled = false;
        this.mesh.position.z = -1;
    }

    public update(deltaTime: number, time: number, mousePosition?: THREE.Vector2): void {
        this.material.uniforms.iTime.value = time;
        
        if (mousePosition) {
            this.material.uniforms.iMouse.value = mousePosition;
        }
    }

    public updateResolution(width: number, height: number): void {
        this.resolution.set(
            width * window.devicePixelRatio,
            height * window.devicePixelRatio,
            1.0
        );
        this.material.uniforms.iResolution.value = this.resolution;
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

    public dispose(): void {
        this.material.dispose();
        this.mesh.geometry.dispose();
    }
}