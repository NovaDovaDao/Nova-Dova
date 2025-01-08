// File: src/ts/core/AnimationLoop.ts
export class AnimationLoop {
    private lastTime: number = 0;
    private animations: ((deltaTime: number) => void)[] = [];

    constructor() {
        this.animate = this.animate.bind(this);
    }

    public start(): void {
        requestAnimationFrame(this.animate);
    }

    public addAnimation(fn: (deltaTime: number) => void): void {
        this.animations.push(fn);
    }

    private animate(currentTime: number): void {
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        for (const animation of this.animations) {
            animation(deltaTime);
        }

        requestAnimationFrame(this.animate);
    }
}
