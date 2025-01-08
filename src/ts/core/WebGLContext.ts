// src/ts/core/WebGLContext.ts
import * as THREE from 'three';

export class WebGLContext {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;

    constructor(container: HTMLElement) {
        // Initialize renderer with proper alpha settings
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            premultipliedAlpha: false,
            stencil: false,
            depth: false,
            preserveDrawingBuffer: false
        });

        // Set clear color to transparent
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.autoClear = true;
        
        this.scene = new THREE.Scene();
        this.scene.background = null; // Ensure scene background is transparent
        
        // Use orthographic camera for 2D effects
        const aspectRatio = window.innerWidth / window.innerHeight;
        this.camera = new THREE.OrthographicCamera(
            -aspectRatio, aspectRatio,
            1, -1,
            0.1, 100
        );
        
        this.camera.position.z = 1;
        
        this.initializeRenderer(container);
        this.handleResize();
    }

    private initializeRenderer(container: HTMLElement): void {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        // Ensure container is transparent
        container.style.backgroundColor = 'transparent';
        container.appendChild(this.renderer.domElement);

        // Set canvas to be transparent
        const canvas = this.renderer.domElement;
        canvas.style.background = 'transparent';
    }

    private handleResize(): void {
        window.addEventListener('resize', () => {
            const aspectRatio = window.innerWidth / window.innerHeight;
            const camera = this.camera as THREE.OrthographicCamera;
            camera.left = -aspectRatio;
            camera.right = aspectRatio;
            camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    public getRenderer(): THREE.WebGLRenderer {
        return this.renderer;
    }

    public getScene(): THREE.Scene {
        return this.scene;
    }

    public getCamera(): THREE.Camera {
        return this.camera;
    }

    public render(): void {
        this.renderer.render(this.scene, this.camera);
    }
}