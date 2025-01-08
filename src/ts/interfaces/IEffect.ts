export interface IEffect {
    update(deltaTime: number): void;
    dispose(): void;
}
