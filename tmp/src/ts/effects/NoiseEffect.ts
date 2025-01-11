import * as THREE from 'three';
import { createShaderMaterial } from '../utils/shaderUtils';

export class NoiseEffect {
    private material: THREE.ShaderMaterial;
    
    constructor(fragmentShader: string, vertexShader: string) {
        this.material = createShaderMaterial(fragmentShader, vertexShader, {
            u_noiseScale: { value: 1.0 },
            u_noiseStrength: { value: 0.5 }
        });
    }
    
    public update(deltaTime: number): void {
        if (this.material.uniforms.u_time) {
            this.material.uniforms.u_time.value += deltaTime;
        }
    }
    
    public getMaterial(): THREE.ShaderMaterial {
        return this.material;
    }
}
