// src/ts/core/AnimationLoop.ts
export class AnimationLoop {
    private lastTime: number = 0;
    private animations: ((deltaTime: number) => void)[] = [];
    private isRunning: boolean = false;
    private animationFrameId: number | null = null;

    constructor() {
        this.animate = this.animate.bind(this);
    }

    public start(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.animationFrameId = requestAnimationFrame(this.animate);
        }
    }

    public pause(): void {
        if (this.isRunning && this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.isRunning = false;
            this.animationFrameId = null;
        }
    }

    public resume(): void {
        if (!this.isRunning) {
            this.start();
        }
    }

    public addAnimation(fn: (deltaTime: number) => void): void {
        this.animations.push(fn);
    }

    private animate(currentTime: number): void {
        if (!this.isRunning) return;

        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        for (const animation of this.animations) {
            animation(deltaTime);
        }

        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    public dispose(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.animations = [];
        this.isRunning = false;
        this.animationFrameId = null;
    }
}