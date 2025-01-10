// src/ts/loaders/LoaderShaderManager.ts
import * as THREE from 'three';
import loaderShader from '../../assets/shaders/loader.frag?raw';

export class LoaderShaderManager {
    private material: THREE.ShaderMaterial;
    private mesh: THREE.Mesh;
    private time: number = 0;
    private resolution: THREE.Vector3;

    constructor(container: HTMLElement) {
        this.resolution = new THREE.Vector3();
        
        this.material = new THREE.ShaderMaterial({
            fragmentShader: loaderShader,
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            uniforms: {
                iResolution: { value: this.resolution },
                iTime: { value: 0 },
                iTimeDelta: { value: 0 },
                iMouse: { value: new THREE.Vector4() }
            },
            transparent: true
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.frustumCulled = false;

        this.updateResolution(container.clientWidth, container.clientHeight);
    }

    public updateResolution(width: number, height: number): void {
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.resolution.set(
            width * pixelRatio,
            height * pixelRatio,
            1.0
        );
        this.material.uniforms.iResolution.value = this.resolution;
    }

    public updateMousePosition(x: number, y: number): void {
        this.material.uniforms.iMouse.value.set(x, y, 0, 0);
    }

    public update(deltaTime: number): void {
        this.time += deltaTime;
        this.material.uniforms.iTime.value = this.time;
        this.material.uniforms.iTimeDelta.value = deltaTime;
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

    public dispose(): void {
        this.material.dispose();
        this.mesh.geometry.dispose();
    }
}