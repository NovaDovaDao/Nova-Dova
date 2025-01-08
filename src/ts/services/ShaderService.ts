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
        
        // Initialize effects
        this.effects.set('noise', new NoiseEffect(
            this.shaderManager.getShader('noise.frag') || '',
            this.shaderManager.getShader('common.vert') || ''
        ));
    }
    
    public getEffect(name: string): IEffect | undefined {
        return this.effects.get(name);
    }
}
