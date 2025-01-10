// File: src/ts/components/AIInterface.ts
export class AIInterface {
    private container: HTMLElement;

    constructor(containerId?: string) {
        if (containerId) {
            const existingContainer = document.getElementById(containerId);
            if (existingContainer) {
                this.container = existingContainer;
            } else {
                this.container = this.createContainer();
            }
        } else {
            this.container = this.createContainer();
        }
        this.initialize();
    }

    private createContainer(): HTMLElement {
        const container = document.createElement('div');
        container.id = 'aiInterface';
        container.classList.add('ai-interface');
        document.body.appendChild(container);
        return container;
    }

    private initialize(): void {
        this.container.innerHTML = `
            <div class="ai-interface__content">
                <h2>AI Agent Interface</h2>
                <div class="ai-interface__interaction">
                </div>
            </div>
        `;
    }
}