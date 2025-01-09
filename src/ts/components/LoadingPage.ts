// src/ts/components/LoadingPage.ts
import { WebGLContext } from '../core/WebGLContext';
import { LoaderShaderManager } from '../loaders/LoaderShaderManager';
import { AnimationLoop } from '../core/AnimationLoop';

export class LoadingPage {
    private container: HTMLElement;
    private context: WebGLContext;
    private shaderManager: LoaderShaderManager;
    private animationLoop: AnimationLoop;
    private loadingText: HTMLElement;
    private isVisible: boolean = false;
    private backdrop: HTMLElement;

    constructor() {
        this.backdrop = this.createBackdrop();
        this.container = this.createContainer();
        this.context = new WebGLContext(this.container);
        this.shaderManager = new LoaderShaderManager(this.container);
        this.animationLoop = new AnimationLoop();
        this.loadingText = this.createLoadingText();
        
        this.initialize();
    }

    private createBackdrop(): HTMLElement {
        const backdrop = document.createElement('div');
        backdrop.className = 'fixed inset-0 bg-black z-40 opacity-0 pointer-events-none transition-opacity duration-300';
        document.body.appendChild(backdrop);
        return backdrop;
    }

    private createContainer(): HTMLElement {
        const container = document.createElement('div');
        container.id = 'loadingPage';
        container.className = 'fixed inset-0 z-50 flex items-center justify-center opacity-0 transform scale-95 pointer-events-none transition-all duration-300';
        container.style.background = 'transparent';
        document.body.appendChild(container);
        return container;
    }

    private createLoadingText(): HTMLElement {
        const textContainer = document.createElement('div');
        textContainer.className = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50';
        
        const text = document.createElement('div');
        text.className = 'text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple animate-pulse-slow';
        text.textContent = 'NOVA DOVA DAO';
        
        const subtext = document.createElement('div');
        subtext.className = 'mt-6 text-xl text-gray-400 opacity-75';
        subtext.innerHTML = 'Loading<span class="animate-pulse">...</span>';
        
        textContainer.appendChild(text);
        textContainer.appendChild(subtext);
        this.container.appendChild(textContainer);
        
        return textContainer;
    }

    private initialize(): void {
        const scene = this.context.getScene();
        scene.add(this.shaderManager.getMesh());

        // Set initial renderer clear color to black
        this.context.getRenderer().setClearColor(0x000000, 1);

        this.animationLoop.addAnimation((deltaTime: number) => {
            if (this.isVisible) {
                this.shaderManager.update(deltaTime);
                this.context.getRenderer().render(scene, this.context.getCamera());
            }
        });

        this.animationLoop.start();
    }

    public preload(): void {
        // Show black backdrop immediately before the transition starts
        this.backdrop.classList.remove('opacity-0');
        this.backdrop.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
    }

    public show(): void {
        this.isVisible = true;
        
        // Ensure the backdrop is visible
        this.backdrop.classList.remove('opacity-0', 'pointer-events-none');
        this.backdrop.classList.add('opacity-100');
        
        // Show the loader with a slight delay to ensure smooth transition
        setTimeout(() => {
            this.container.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
            this.container.classList.add('opacity-100', 'scale-100');
        }, 50);
        
        document.body.style.overflow = 'hidden';
    }

    public hide(): void {
        this.isVisible = false;
        
        // Hide the loader first
        this.container.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        this.container.classList.remove('opacity-100', 'scale-100');
        
        // Hide the backdrop with a slight delay
        setTimeout(() => {
            this.backdrop.classList.add('opacity-0', 'pointer-events-none');
            this.backdrop.classList.remove('opacity-100');
            document.body.style.overflow = '';
        }, 300);
    }

    public dispose(): void {
        this.shaderManager.dispose();
        this.context.getRenderer().dispose();
        this.backdrop.remove();
        this.container.remove();
    }
}