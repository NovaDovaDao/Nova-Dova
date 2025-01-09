interface AgentData {
    name: string;
    description: string;
    aiModel: string[];
}

export class AgentCard {
    private element: HTMLElement;

    constructor(data: AgentData) {
        this.element = this.createCard(data);
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    private createCard(data: AgentData): HTMLElement {
        const card = document.createElement('div');
        card.className = 'bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300';
        
        card.innerHTML = `
            <div class="flex flex-col h-full">
                <h3 class="text-xl font-semibold bg-gradient-to-r from-space-blue to-space-purple bg-clip-text text-transparent">
                    ${data.name}
                </h3>
                <p class="text-gray-300 mt-4">${data.description}</p>
                <div class="mt-4">
                    <h4 class="text-sm font-semibold text-gray-400">AI Model</h4>
                    <div class="flex flex-wrap gap-2 mt-2">
                        ${data.aiModel.map(aiModel => `
                            <span class="px-2 py-1 text-xs bg-gray-700 rounded-full text-gray-300">
                                ${aiModel}
                            </span>
                        `).join('')}
                    </div>
                </div>
                <div class="mt-auto pt-4 flex justify-end">
                    <button class="px-4 py-2 text-sm bg-gradient-to-r from-space-blue to-space-purple rounded-lg hover:opacity-90 transition-opacity">
                        Connect
                    </button>
                </div>
            </div>
        `;

        return card;
    }
}
