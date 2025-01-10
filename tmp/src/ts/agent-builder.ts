// src/ts/agent-builder.ts
import '../styles/main.css';
import { WebGLContext } from './core/WebGLContext';
import { AnimationLoop } from './core/AnimationLoop';
import { CosmicBackgroundEffect } from './effects/CosmicBackgroundEffect';
import { TagInput } from './components/TagInput';
import cosmicShader from '../assets/shaders/cosmic-kaleidoscope.frag?raw';

interface AgentFormData {
    agentName: string;
    description: string;
    aiModel: string;
    messageExamples: string;
    postExamples: string;
    goals: string;
    adjectives: string[];
    topics: string[];
    [key: string]: string | string[]; // Add index signature
}

class AgentBuilder {
    private context: WebGLContext;
    private animationLoop: AnimationLoop;
    private cosmicEffect: CosmicBackgroundEffect;
    private formData: AgentFormData;
    private adjectivesInput!: TagInput; // Use definite assignment assertion
    private topicsInput!: TagInput;

    constructor() {
        const container = document.getElementById('agentBuilderCanvas');
        if (!container) throw new Error('Agent builder canvas container not found');
        
        this.context = new WebGLContext(container);
        this.animationLoop = new AnimationLoop();
        this.cosmicEffect = new CosmicBackgroundEffect(cosmicShader);
        
        this.formData = this.initializeFormData();
        
        this.initialize();
    }

    private initializeFormData(): AgentFormData {
        return {
            agentName: '',
            description: '',
            aiModel: 'gpt4',
            messageExamples: '',
            postExamples: '',
            goals: '',
            adjectives: [],
            topics: []
        };
    }

    private async initialize(): Promise<void> {
        await this.setupBackground();
        this.setupFormListeners();
        this.setupTagInputs();
        this.setupSaveButton();
    }

    private async setupBackground(): Promise<void> {
        try {
            const scene = this.context.getScene();
            if (scene) {
                scene.add(this.cosmicEffect.getMesh());
            }

            this.context.getRenderer().render(
                this.context.getScene(),
                this.context.getCamera()
            );

            let time = 0;
            this.animationLoop.addAnimation((deltaTime: number) => {
                time += deltaTime;
                this.cosmicEffect.update(deltaTime, time);
                this.context.getRenderer().render(
                    this.context.getScene(),
                    this.context.getCamera()
                );
            });

            this.animationLoop.start();
        } catch (error) {
            console.error('Failed to setup background:', error);
        }
    }

    private setupFormListeners(): void {
        // Update the form field listener to handle both string and string[] types
        const formFields = ['agentName', 'description', 'aiModel', 'messageExamples', 'postExamples', 'goals'];
        
        formFields.forEach(fieldName => {
            const element = document.querySelector(`[name="${fieldName}"]`);
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
                element.addEventListener('input', (e) => {
                    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
                    (this.formData[fieldName] as string) = target.value; // Type assertion
                });
            }
        });
    }

    private setupTagInputs(): void {
        // Initialize adjectives input
        this.adjectivesInput = new TagInput({
            containerId: 'adjectives',
            inputId: 'adjectiveInput',
            placeholder: 'Add adjective and press Enter',
            maxTags: 10,
            validateTag: (tag) => tag.length >= 2 && tag.length <= 20,
            onTagAdd: () => this.updatePreview(),
            onTagRemove: () => this.updatePreview(),
            customStyles: {
                tag: 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-space-blue/20 border border-space-blue/30 text-sm text-space-blue',
                removeButton: 'ml-1 hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 rounded'
            }
        });

        // Initialize topics input
        this.topicsInput = new TagInput({
            containerId: 'topics',
            inputId: 'topicInput',
            placeholder: 'Add topic and press Enter',
            maxTags: 15,
            validateTag: (tag) => tag.length >= 2 && tag.length <= 30,
            onTagAdd: () => this.updatePreview(),
            onTagRemove: () => this.updatePreview(),
            customStyles: {
                tag: 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-space-purple/20 border border-space-purple/30 text-sm text-space-purple',
                removeButton: 'ml-1 hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 rounded'
            }
        });
    }

    private setupTagInput(inputId: string, containerId: string, tagList: string[]): void {
        const input = document.getElementById(inputId) as HTMLInputElement;
        const container = document.getElementById(containerId);
        
        if (!input || !container) return;

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const value = input.value.trim();
                
                if (value && !tagList.includes(value)) {
                    tagList.push(value);
                    this.addTagToContainer(value, container, () => {
                        const index = tagList.indexOf(value);
                        if (index > -1) {
                            tagList.splice(index, 1);
                            this.updatePreview();
                        }
                    });
                    input.value = '';
                    this.updatePreview();
                }
            }
        });
    }

    private addTagToContainer(value: string, container: HTMLElement, onRemove: () => void): void {
        const tag = document.createElement('div');
        tag.className = 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-700/50 border border-gray-600 text-sm';
        
        const text = document.createElement('span');
        text.textContent = value;
        
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '×';
        removeBtn.className = 'ml-1 hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 rounded';
        removeBtn.addEventListener('click', () => {
            container.removeChild(tag);
            onRemove();
        });

        tag.appendChild(text);
        tag.appendChild(removeBtn);
        container.appendChild(tag);
    }

    private updatePreview(): void {
        // Update name
        const namePreview = document.getElementById('previewName');
        if (namePreview) {
            namePreview.textContent = this.formData.agentName || 'Agent Name';
        }

        // Update description
        const descriptionPreview = document.getElementById('previewDescription');
        if (descriptionPreview) {
            descriptionPreview.textContent = this.formData.description || 'Agent description will appear here...';
        }

        // Update tags preview
        const tagsPreview = document.getElementById('previewTags');
        if (tagsPreview) {
            tagsPreview.innerHTML = '';
            
            // Add adjectives
            this.adjectivesInput.getTags().forEach(adj => {
                const tag = document.createElement('span');
                tag.className = 'px-2 py-1 text-xs rounded-full bg-space-blue/20 text-space-blue border border-space-blue/30';
                tag.textContent = adj;
                tagsPreview.appendChild(tag);
            });

            // Add topics
            this.topicsInput.getTags().forEach(topic => {
                const tag = document.createElement('span');
                tag.className = 'px-2 py-1 text-xs rounded-full bg-space-purple/20 text-space-purple border border-space-purple/30';
                tag.textContent = topic;
                tagsPreview.appendChild(tag);
            });
        }

        // Update message preview
        const messagePreview = document.getElementById('previewMessage');
        if (messagePreview) {
            const messages = this.formData.messageExamples.split('\n').filter(msg => msg.trim());
            messagePreview.textContent = messages[0] || 'Sample message will appear here...';
        }
    }

    private setupSaveButton(): void {
        const saveButton = document.getElementById('saveAgent');
        if (saveButton) {
            saveButton.addEventListener('click', async () => {
                try {
                    // Validate form data
                    if (!this.validateForm()) {
                        throw new Error('Please fill in all required fields');
                    }

                    // Prepare complete form data
                    const completeFormData: AgentFormData = {
                        ...this.formData,
                        adjectives: this.adjectivesInput.getTags(),
                        topics: this.topicsInput.getTags()
                    };

                    // In a real application, this would be an API call
                    console.log('Saving agent:', completeFormData);
                    
                    // Show success message
                    this.showNotification('Agent saved successfully!', 'success');
                    
                    // Redirect back to dashboard after short delay
                    setTimeout(() => {
                        window.location.href = '/dashboard.html';
                    }, 1500);
                } catch (error) {
                    this.showNotification(
                        error instanceof Error ? error.message : 'Failed to save agent',
                        'error'
                    );
                }
            });
        }
    }

    private validateForm(): boolean {
        // Validate required fields
        const requiredFields = ['agentName', 'description', 'aiModel'];
        const hasRequiredFields = requiredFields.every(field => 
            Boolean(this.formData[field as keyof AgentFormData])
        );

        // Validate adjectives and topics
        const hasValidAdjectives = this.adjectivesInput.validate();
        const hasValidTopics = this.topicsInput.validate();
        const hasMinimumTags = this.adjectivesInput.getTags().length >= 2 && 
                              this.topicsInput.getTags().length >= 1;

        return hasRequiredFields && hasValidAdjectives && hasValidTopics && hasMinimumTags;
    }

    private showNotification(message: string, type: 'success' | 'error'): void {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `
            fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg
            ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
            transform transition-transform duration-300 ease-out
        `;
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the agent builder when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AgentBuilder();
});