// src/ts/main.ts
import '../styles/main.css';
import '../styles/animations.css';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { AIInterface } from './components/AIInterface';
import { AnimationLoop } from './core/AnimationLoop';
import { CosmicBackgroundEffect } from './effects/CosmicBackgroundEffect';
import { PageTransitionManager } from './core/PageTransitionManager';

// Import shader directly using Vite's ?raw query
import cosmicShader from '../assets/shaders/cosmic-kaleidoscope.frag?raw';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize the transition manager early
        const transitionManager = PageTransitionManager.getInstance();

        // Show loading while initializing the app
        await transitionManager.transition(async () => {
            // Create canvas container if it doesn't exist
            let heroCanvas = document.getElementById('heroCanvas');
            if (!heroCanvas) {
                heroCanvas = document.createElement('div');
                heroCanvas.id = 'heroCanvas';
                heroCanvas.className = 'fixed inset-0 z-0';
                document.body.prepend(heroCanvas);
            }

            // Initialize components
            const hero = new Hero(heroCanvas);
            const nav = new Navigation();
            const aiInterface = new AIInterface();
            
            // Create cosmic effect with imported shader
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
        });

        // Add click handlers for navigation
        document.addEventListener('click', async (e) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            
            if (link && link.href && !link.href.startsWith('#')) {
                e.preventDefault();
                
                await PageTransitionManager.getInstance().transition(async () => {
                    // Load the new page content
                    try {
                        const response = await fetch(link.href);
                        const html = await response.text();
                        
                        // Extract the main content
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const newContent = doc.querySelector('main');
                        
                        if (newContent) {
                            const currentContent = document.querySelector('main');
                            if (currentContent) {
                                currentContent.replaceWith(newContent);
                            }
                        }

                        // Update the URL
                        window.history.pushState({}, '', link.href);
                    } catch (error) {
                        console.error('Failed to load page:', error);
                    }
                });
            }
        });

    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', async () => {
    await PageTransitionManager.getInstance().transition(async () => {
        try {
            const response = await fetch(window.location.href);
            const html = await response.text();
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('main');
            
            if (newContent) {
                const currentContent = document.querySelector('main');
                if (currentContent) {
                    currentContent.replaceWith(newContent);
                }
            }
        } catch (error) {
            console.error('Failed to load page:', error);
        }
    });
});