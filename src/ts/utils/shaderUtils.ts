// File: src/ts/utils/shaderUtils.ts
import * as THREE from 'three';

export const createShaderMaterial = (
    fragmentShader: string,
    vertexShader: string,
    uniforms: { [key: string]: THREE.IUniform } = {}
): THREE.ShaderMaterial => {
    return new THREE.ShaderMaterial({
        fragmentShader,
        vertexShader,
        uniforms: {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2() },
            ...uniforms
        }
    });
};
