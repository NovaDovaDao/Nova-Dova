// src/ts/services/ShaderService.ts
import { ShaderManager } from '../core/ShaderManager';
import { NoiseEffect } from '../effects/NoiseEffect';
import { IEffect } from '../interfaces/IEffect';

export class ShaderService {
    private shaderManager: ShaderManager;
    private effects: Map<string, IEffect>;
    
    constructor() {
        this.shaderManager = new ShaderManager();
        this.effects = new Map();
    }
    
    public async initialize(): Promise<void> {
        await this.shaderManager.waitForShaders();
        
        // Initialize noise effect with proper interface implementation
        const noiseEffect = new NoiseEffect(
            this.shaderManager.getShader('noise.frag') || '',
            this.shaderManager.getShader('common.vert') || ''
        );
        
        // Extend NoiseEffect to implement IEffect fully
        const effectWrapper: IEffect = {
            update: (deltaTime: number) => noiseEffect.update(deltaTime),
            dispose: () => {} // Add a no-op dispose method
        };
        
        this.effects.set('noise', effectWrapper);
    }
    
    public getEffect(name: string): IEffect | undefined {
        return this.effects.get(name);
    }
}