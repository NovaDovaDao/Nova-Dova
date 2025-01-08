import { WebGLContext } from '../core/WebGLContext';
import { StarFieldEffect } from '../effects/StarFieldEffect';
import { ShaderService } from '../services/ShaderService';

export class IndexComponent {
    private context: WebGLContext;
    private starFieldEffect: StarFieldEffect | null = null;
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
        const starFieldShader = await fetch('/src/assets/shaders/starfield.frag').then(r => r.text());
        
        this.starFieldEffect = new StarFieldEffect(starFieldShader);
        this.context.getScene().add(this.starFieldEffect.getMesh());
        
        this.handleEvents();
        this.updateSize();
        this.animate(0);
    }

    private handleEvents(): void {
        window.addEventListener('resize', () => this.updateSize());
        window.addEventListener('mousemove', (e) => {
            if (this.starFieldEffect) {
                this.starFieldEffect.updateMousePosition(
                    e.clientX,
                    window.innerHeight - e.clientY
                );
            }
        });
    }

    private updateSize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.context.getRenderer().setSize(width, height);
        if (this.starFieldEffect) {
            this.starFieldEffect.updateResolution(width, height);
        }
    }

    private animate(time: number): void {
        this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
        
        const deltaTime = (time - this.lastTime) / 1000;
        this.lastTime = time;
        
        if (this.starFieldEffect) {
            this.starFieldEffect.update(deltaTime, time / 1000);
        }
        
        this.context.getRenderer().render(
            this.context.getScene(),
            this.context.getCamera()
        );
    }

    public dispose(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.starFieldEffect) {
            this.starFieldEffect.dispose();
        }
        this.context.getRenderer().dispose();
    }
}
