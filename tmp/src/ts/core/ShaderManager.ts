// src/ts/core/ShaderManager.ts
// Import shaders directly using Vite's ?raw query
import cosmicShader from '../../assets/shaders/cosmic-kaleidoscope.frag?raw';
import commonVert from '../../assets/shaders/common.vert?raw';
import noiseShader from '../../assets/shaders/noise.frag?raw';
import patternsShader from '../../assets/shaders/patterns.frag?raw';
import starfieldShader from '../../assets/shaders/starfield.frag?raw';
import kaleidoscopicShader from '../../assets/shaders/kaleidoscopic.frag?raw';
import heroShader from '../../assets/shaders/hero.frag?raw';

export class ShaderManager {
    private shaders: Map<string, string>;
    private initialized: boolean;

    constructor() {
        this.shaders = new Map();
        this.initialized = false;
        this.initialize();
    }

    private initialize(): void {
        // Initialize with imported shaders
        this.shaders.set('cosmic-kaleidoscope.frag', cosmicShader);
        this.shaders.set('common.vert', commonVert);
        this.shaders.set('noise.frag', noiseShader);
        this.shaders.set('patterns.frag', patternsShader);
        this.shaders.set('starfield.frag', starfieldShader);
        this.shaders.set('kaleidoscopic.frag', kaleidoscopicShader);
        this.shaders.set('hero.frag', heroShader);
        
        this.initialized = true;
    }

    public waitForShaders(): Promise<void> {
        return Promise.resolve();
    }

    public getShader(name: string): string | undefined {
        if (!this.initialized) {
            console.warn('ShaderManager not initialized');
            return undefined;
        }
        
        const shader = this.shaders.get(name);
        if (!shader) {
            console.warn(`Shader not found: ${name}`);
        }
        return shader;
    }
}