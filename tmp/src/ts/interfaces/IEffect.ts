// src/ts/interfaces/IEffect.ts
export interface IEffect {
    update(deltaTime: number, time?: number): void;
    dispose(): void;
}