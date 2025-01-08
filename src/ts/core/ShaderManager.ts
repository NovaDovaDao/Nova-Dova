// src/ts/core/ShaderManager.ts
export class ShaderManager {
    private shaders: Map<string, string>;
    private initialized: Promise<void>;

    constructor() {
        this.shaders = new Map();
        this.initialized = this.loadShaders();
    }

    private async loadShaders(): Promise<void> {
        const shaderFiles = [
            'hero.frag',
            'noise.frag',
            'patterns.frag',
            'common.vert'
        ];

        await Promise.all(shaderFiles.map(async (file) => {
            const response = await fetch(`/src/assets/shaders/${file}`);
            const shader = await response.text();
            this.shaders.set(file, shader);
        }));
    }

    public async waitForShaders(): Promise<void> {
        return this.initialized;
    }

    public getShader(name: string): string | undefined {
        return this.shaders.get(name);
    }
}