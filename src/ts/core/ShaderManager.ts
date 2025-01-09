// src/ts/core/ShaderManager.ts
export class ShaderManager {
    private shaders: Map<string, string>;
    private initialized: Promise<void>;

    constructor() {
        this.shaders = new Map();
        this.initialized = this.loadShaders();
    }

    private async loadShader(name: string): Promise<string> {
        try {
            const response = await fetch(`/src/assets/shaders/${name}`);
            if (!response.ok) {
                throw new Error(`Failed to load shader: ${name}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Error loading shader ${name}:`, error);
            throw error;
        }
    }

    private async loadShaders(): Promise<void> {
        const shaderFiles = [
            'cosmic-kaleidoscope.frag',
            'common.vert',
            'background.frag',
            'noise.frag',
            'patterns.frag',
            'starfield.frag',
            'kaleidoscopic.frag',
            'hero.frag'
        ];

        try {
            await Promise.all(shaderFiles.map(async (file) => {
                const shader = await this.loadShader(file);
                this.shaders.set(file, shader);
            }));
        } catch (error) {
            console.error('Failed to load shaders:', error);
            throw error;
        }
    }

    public async waitForShaders(): Promise<void> {
        return this.initialized;
    }

    public getShader(name: string): string | undefined {
        const shader = this.shaders.get(name);
        if (!shader) {
            console.warn(`Shader not found: ${name}`);
        }
        return shader;
    }
}