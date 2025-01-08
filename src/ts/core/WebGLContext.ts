import * as THREE from 'three';

export class WebGLContext {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private mousePosition: THREE.Vector2;

    constructor(container: HTMLElement) {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            premultipliedAlpha: false,
            stencil: false,
            depth: false
        });

        this.renderer.setClearColor(0x000000, 0);
        this.renderer.autoClear = true;
        
        this.scene = new THREE.Scene();
        this.scene.background = null;
        
        const aspectRatio = window.innerWidth / window.innerHeight;
        this.camera = new THREE.OrthographicCamera(
            -aspectRatio, aspectRatio,
            1, -1,
            0.1, 100
        );
        
        this.camera.position.z = 1;
        
        // Initialize mouse position
        this.mousePosition = new THREE.Vector2(0, 0);
        
        this.initializeRenderer(container);
        this.handleEvents();
    }

    private initializeRenderer(container: HTMLElement): void {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        container.style.backgroundColor = 'transparent';
        container.appendChild(this.renderer.domElement);

        const canvas = this.renderer.domElement;
        canvas.style.background = 'transparent';
    }

    private handleEvents(): void {
        // Handle window resize
        window.addEventListener('resize', () => {
            const aspectRatio = window.innerWidth / window.innerHeight;
            const camera = this.camera as THREE.OrthographicCamera;
            camera.left = -aspectRatio;
            camera.right = aspectRatio;
            camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Handle mouse events
        this.renderer.domElement.addEventListener('mousemove', (event) => {
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = window.innerHeight - event.clientY; // Flip Y coordinate for shader
        });

        // Initialize at center if no mouse movement
        this.mousePosition.x = window.innerWidth / 2;
        this.mousePosition.y = window.innerHeight / 2;
    }

    public getMousePosition(): THREE.Vector2 {
        return this.mousePosition;
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