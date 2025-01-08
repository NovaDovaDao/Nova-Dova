// src/ts/components/IndexComponent.ts
import { WebGLContext } from '../core/WebGLContext';
import { ShaderService } from '../services/ShaderService';

export class IndexComponent {
    private context: WebGLContext;
    private shaderService: ShaderService;
    private animationFrameId: number = 0;
    private lastTime: number = 0;

    constructor(container: HTMLElement) {
        this.context = new WebGLContext(container);
        this.shaderService = new ShaderService();
        this.initialize();
    }

    private async initialize(): Promise<void> {
        await this.shaderService.initialize();
        this.handleEvents();
        this.updateSize();
        this.animate(0);
    }

    private handleEvents(): void {
        window.addEventListener('resize', () => this.updateSize());
    }

    private updateSize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.context.getRenderer().setSize(width, height);
    }

    private animate(time: number): void {
        this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
        const deltaTime = (time - this.lastTime) / 1000;
        this.lastTime = time;
        
        this.context.getRenderer().render(
            this.context.getScene(),
            this.context.getCamera()
        );
    }

    public dispose(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.context.getRenderer().dispose();
    }

    public getContext(): WebGLContext {
        return this.context;
    }
}