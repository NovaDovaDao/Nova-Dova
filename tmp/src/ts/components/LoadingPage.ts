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
    private resizeObserver: ResizeObserver;

    constructor() {
        this.backdrop = this.createBackdrop();
        this.container = this.createContainer();
        this.context = new WebGLContext(this.container);
        this.shaderManager = new LoaderShaderManager(this.container);
        this.animationLoop = new AnimationLoop();
        this.loadingText = this.createLoadingText();
        
        // Initialize resize observer
        this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
        this.resizeObserver.observe(this.container);
        
        this.initialize();
        this.setupEventListeners();
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
        container.className = `
            fixed inset-0 z-50 
            flex items-center justify-center 
            opacity-0 transform scale-95 pointer-events-none 
            transition-all duration-300
            overflow-hidden
            touch-none
        `;
        container.style.background = 'transparent';
        document.body.appendChild(container);
        return container;
    }

    private createLoadingText(): HTMLElement {
        const textContainer = document.createElement('div');
        textContainer.className = `
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            text-center z-50 
            w-full max-w-[90vw] px-4
        `;
        
        const text = document.createElement('div');
        text.className = `
            font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-space-blue to-space-purple 
            animate-pulse-slow
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
        `;
        text.textContent = 'NOVA DOVA DAO';
        
        const subtext = document.createElement('div');
        subtext.className = `
            mt-2 sm:mt-4 md:mt-6
            text-base sm:text-lg md:text-xl lg:text-2xl
            text-gray-400 opacity-75
        `;
        subtext.innerHTML = 'Loading<span class="animate-pulse">...</span>';
        
        textContainer.appendChild(text);
        textContainer.appendChild(subtext);
        this.container.appendChild(textContainer);
        
        return textContainer;
    }

    private handleResize(entries: ResizeObserverEntry[]): void {
        const entry = entries[0];
        if (entry) {
            const { width, height } = entry.contentRect;
            this.context.getRenderer().setSize(width, height);
            this.shaderManager.updateResolution(width, height);
            
            // Update pixel ratio on resize
            const pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.context.getRenderer().setPixelRatio(pixelRatio);
        }
    }

    private initialize(): void {
        const scene = this.context.getScene();
        scene.add(this.shaderManager.getMesh());

        // Set initial renderer settings
        const renderer = this.context.getRenderer();
        renderer.setClearColor(0x000000, 1);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.animationLoop.addAnimation((deltaTime: number) => {
            if (this.isVisible) {
                this.shaderManager.update(deltaTime);
                renderer.render(scene, this.context.getCamera());
            }
        });

        this.animationLoop.start();
    }

    private setupEventListeners(): void {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                const { width, height } = this.container.getBoundingClientRect();
                this.handleResize([{ contentRect: { width, height } } as ResizeObserverEntry]);
            }, 100);
        });
    
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.animationLoop.pause();  // Remove optional chaining
            } else {
                this.animationLoop.resume(); // Remove optional chaining
            }
        });
    
        this.container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches[0]) {
                const touch = e.touches[0];
                const rect = this.container.getBoundingClientRect();
                this.shaderManager.updateMousePosition(
                    touch.clientX - rect.left,
                    touch.clientY - rect.top
                );
            }
        }, { passive: false });
    }

    // Public methods that need to be accessible
    public show(): void {
        this.isVisible = true;
        this.backdrop.classList.remove('opacity-0', 'pointer-events-none');
        this.container.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        this.container.classList.add('opacity-100', 'scale-100');
        document.body.style.overflow = 'hidden';
    }

    public hide(): void {
        this.isVisible = false;
        this.container.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        this.container.classList.remove('opacity-100', 'scale-100');
        
        setTimeout(() => {
            this.backdrop.classList.add('opacity-0', 'pointer-events-none');
            this.backdrop.classList.remove('opacity-100');
            document.body.style.overflow = '';
        }, 300);
    }

    public dispose(): void {
        this.shaderManager.dispose();
        this.context.getRenderer().dispose();
        this.resizeObserver.disconnect();
        this.backdrop.remove();
        this.container.remove();
    }
}