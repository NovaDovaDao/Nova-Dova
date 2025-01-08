// src/ts/main.ts
import '../styles/main.css';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { AIInterface } from './components/AIInterface';
import { AnimationLoop } from './core/AnimationLoop';
import { CosmicBackgroundEffect } from './effects/CosmicBackgroundEffect';

// Import shader directly
const shaderPath = '/src/assets/shaders/cosmic-kaleidoscope.frag';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Create canvas container if it doesn't exist
        let heroCanvas = document.getElementById('heroCanvas');
        if (!heroCanvas) {
            heroCanvas = document.createElement('div');
            heroCanvas.id = 'heroCanvas';
            heroCanvas.className = 'fixed inset-0 z-0';
            document.body.prepend(heroCanvas);
        }

        // Load shader
        const response = await fetch(shaderPath);
        if (!response.ok) {
            throw new Error(`Failed to load shader: ${response.statusText}`);
        }
        const cosmicShader = await response.text();

        // Initialize components
        const hero = new Hero(heroCanvas);
        const nav = new Navigation();
        const aiInterface = new AIInterface();
        
        // Create cosmic effect
        const cosmicEffect = new CosmicBackgroundEffect(cosmicShader);

        // Wait a frame to ensure everything is initialized
        await new Promise(resolve => requestAnimationFrame(resolve));

        // Add cosmic effect to scene
        const scene = hero.getScene();
        if (scene) {
            scene.add(cosmicEffect.getMesh());
        }

        // Setup animation loop
        const animationLoop = new AnimationLoop();
        let time = 0;

        animationLoop.addAnimation((deltaTime: number) => {
            time += deltaTime;
            hero.update(deltaTime);
            cosmicEffect.update(deltaTime, time);
        });

        animationLoop.start();
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});