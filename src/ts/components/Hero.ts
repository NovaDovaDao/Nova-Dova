// src/ts/components/Hero.ts
import * as THREE from 'three';
import { WebGLContext } from '../core/WebGLContext';
import { ShaderManager } from '../core/ShaderManager';

export class Hero {
    private context: WebGLContext;
    private shaderManager: ShaderManager;
    private material: THREE.ShaderMaterial | null = null;
    private mesh: THREE.Mesh | null = null;
    private initialized: boolean = false;

    constructor(container: HTMLElement) {
        this.context = new WebGLContext(container);
        this.shaderManager = new ShaderManager();
        this.initialize();
    }

    private async initialize(): Promise<void> {
        await this.shaderManager.waitForShaders();
        
        const geometry = new THREE.PlaneGeometry(2, 2);
        
        this.material = new THREE.ShaderMaterial({
            fragmentShader: this.shaderManager.getShader('hero.frag'),
            vertexShader: this.shaderManager.getShader('common.vert'),
            uniforms: {
                u_time: { value: 0.0 },
                u_resolution: { 
                    value: new THREE.Vector2(
                        window.innerWidth * window.devicePixelRatio,
                        window.innerHeight * window.devicePixelRatio
                    )
                }
            },
            transparent: true
        });

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.frustumCulled = false;
        this.mesh.position.z = 0;
        
        this.context.getScene().add(this.mesh);
        this.initialized = true;

        window.addEventListener('resize', () => {
            if (this.material) {
                this.material.uniforms.u_resolution.value.set(
                    window.innerWidth * window.devicePixelRatio,
                    window.innerHeight * window.devicePixelRatio
                );
            }
        });
    }

    public update(deltaTime: number): void {
        if (this.initialized && this.material && this.material.uniforms.u_time) {
            this.material.uniforms.u_time.value += deltaTime;
            this.context.getRenderer().render(
                this.context.getScene(),
                this.context.getCamera()
            );
        }
    }

    public getScene(): THREE.Scene {
        return this.context.getScene();
    }

    public getContext(): WebGLContext {
        return this.context;
    }
}