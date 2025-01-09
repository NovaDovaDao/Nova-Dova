import * as THREE from 'three';
import loaderShader from '../../assets/shaders/loader.frag?raw';

export class LoaderShaderManager {
    private material: THREE.ShaderMaterial;
    private mesh: THREE.Mesh;
    private time: number = 0;

    constructor(container: HTMLElement) {
        this.material = new THREE.ShaderMaterial({
            fragmentShader: loaderShader,
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            uniforms: {
                iResolution: { value: new THREE.Vector3() },
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
        this.setupEventListeners(container);
    }

    private setupEventListeners(container: HTMLElement): void {
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            this.updateResolution(width, height);
        });

        resizeObserver.observe(container);

        container.addEventListener('mousemove', (event) => {
            const rect = container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = rect.height - (event.clientY - rect.top);
            this.material.uniforms.iMouse.value.set(x, y, 0, 0);
        });
    }

    public updateResolution(width: number, height: number): void {
        this.material.uniforms.iResolution.value.set(
            width,
            height,
            1.0
        );
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
