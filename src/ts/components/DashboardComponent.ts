import { AgentCard } from './AgentCard';
import { WebGLContext } from '../core/WebGLContext';
import { CosmicBackgroundEffect } from '../effects/CosmicBackgroundEffect';
import { AnimationLoop } from '../core/AnimationLoop';
// Import shader directly using Vite's ?raw query
import cosmicShader from '../../assets/shaders/cosmic-kaleidoscope.frag?raw';

export class DashboardComponent {
    private context: WebGLContext;
    private agents: AgentCard[] = [];
    private cosmicEffect: CosmicBackgroundEffect | null = null;
    private animationLoop: AnimationLoop;

    constructor() {
        const container = document.getElementById('dashboardCanvas');
        if (!container) throw new Error('Dashboard canvas container not found');
        this.context = new WebGLContext(container);
        this.animationLoop = new AnimationLoop();
    }

    public async initialize(): Promise<void> {
        await this.setupBackground();
        this.setupEventListeners();
        this.loadAgents();
        this.startAnimation();
    }

    private async setupBackground(): Promise<void> {
        try {
            // Create cosmic effect with imported shader
            this.cosmicEffect = new CosmicBackgroundEffect(cosmicShader);
            
            // Add cosmic effect to scene
            const scene = this.context.getScene();
            if (scene && this.cosmicEffect) {
                scene.add(this.cosmicEffect.getMesh());
            }

            // Initial render
            this.context.getRenderer().render(
                this.context.getScene(),
                this.context.getCamera()
            );

        } catch (error) {
            console.error('Failed to setup background:', error);
        }
    }

    private startAnimation(): void {
        let time = 0;

        this.animationLoop.addAnimation((deltaTime: number) => {
            time += deltaTime;
            if (this.cosmicEffect) {
                this.cosmicEffect.update(deltaTime, time);
            }
            this.context.getRenderer().render(
                this.context.getScene(),
                this.context.getCamera()
            );
        });

        this.animationLoop.start();
    }

    private setupEventListeners(): void {
        // Handle window resize
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            this.context.getRenderer().setSize(width, height);
            if (this.cosmicEffect) {
                this.cosmicEffect.updateResolution(width, height);
            }
        });

        // Handle create agent button
        const createButton = document.getElementById('createAgent');
        if (createButton) {
            createButton.addEventListener('click', () => this.createNewAgent());
        }
    }

    private createNewAgent(): void {
        // Implement agent creation logic
        console.log('Creating new agent...');
    }

    private loadAgents(): void {
        const agentContainer = document.getElementById('agentCards');
        if (!agentContainer) return;

        // Example agent data
        const mockAgents = [
            {
                name: 'Analysis Agent',
                bio: 'Specialized in data analysis and pattern recognition',
                description: 'Processes complex datasets to extract meaningful insights',
                clients: ['Data Corp', 'Analytics Inc']
            },
            {
                name: 'Research Assistant',
                bio: 'Advanced research and information gathering',
                description: 'Conducts thorough research and synthesizes information',
                clients: ['Research Lab', 'Academic Institute']
            },
            {
                name: 'Creative AI',
                bio: 'Creative content generation and ideation',
                description: 'Generates innovative ideas and creative content',
                clients: ['Creative Studio', 'Media Agency']
            }
        ];

        mockAgents.forEach(agentData => {
            const card = new AgentCard(agentData);
            agentContainer.appendChild(card.getElement());
            this.agents.push(card);
        });
    }

    public dispose(): void {
        if (this.cosmicEffect) {
            this.cosmicEffect.dispose();
        }
        this.context.getRenderer().dispose();
    }
}
