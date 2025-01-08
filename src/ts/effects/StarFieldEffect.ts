import * as THREE from 'three';
import { IEffect } from '../interfaces/IEffect';

export class StarFieldEffect implements IEffect {
    private material: THREE.ShaderMaterial;
    private mesh: THREE.Mesh;
    private mousePosition: THREE.Vector4;
    private noiseTexture: THREE.DataTexture;
    private time: number = 0;

    constructor(fragmentShader: string) {
        // Create noise texture
        const size = 256;
        const data = new Float32Array(size * size * 4);
        for(let i = 0; i < data.length; i++) {
            data[i] = Math.random();
        }
        this.noiseTexture = new THREE.DataTexture(
            data,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        this.noiseTexture.needsUpdate = true;

        this.mousePosition = new THREE.Vector4();
        
        this.material = new THREE.ShaderMaterial({
            fragmentShader,
            vertexShader: `
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector3() },
                iMouse: { value: this.mousePosition },
                iTimeDelta: { value: 0 },
                iChannel0: { value: this.noiseTexture }
            }
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(geometry, this.material);
    }

    public update(deltaTime: number): void {
        this.time += deltaTime;
        this.material.uniforms.iTime.value = this.time;
        this.material.uniforms.iTimeDelta.value = deltaTime;
    }

    public updateMousePosition(x: number, y: number): void {
        this.mousePosition.x = x;
        this.mousePosition.y = y;
    }

    public updateResolution(width: number, height: number): void {
        this.material.uniforms.iResolution.value.set(width, height, 1);
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

    public dispose(): void {
        this.material.dispose();
        this.mesh.geometry.dispose();
        this.noiseTexture.dispose();
    }
}