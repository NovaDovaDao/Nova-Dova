// src/ts/components/TagInput.ts

interface TagInputOptions {
    containerId: string;
    inputId: string;
    placeholder?: string;
    maxTags?: number;
    onTagAdd?: (tag: string) => void;
    onTagRemove?: (tag: string) => void;
    validateTag?: (tag: string) => boolean;
    customStyles?: {
        tag?: string;
        input?: string;
        removeButton?: string;
    };
}

export class TagInput {
    private container: HTMLElement;
    private input: HTMLInputElement;
    private tags: Set<string> = new Set();
    private options: Required<TagInputOptions>;

    private static defaultOptions: Partial<TagInputOptions> = {
        placeholder: 'Add tag and press Enter',
        maxTags: Infinity,
        onTagAdd: () => {},
        onTagRemove: () => {},
        validateTag: () => true,
        customStyles: {
            tag: 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-700/50 border border-gray-600 text-sm',
            input: 'mt-2 block w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white shadow-sm focus:border-space-purple focus:ring focus:ring-space-purple/20 transition-colors',
            removeButton: 'ml-1 hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 rounded'
        }
    };

    constructor(options: TagInputOptions) {
        this.options = { ...TagInput.defaultOptions, ...options } as Required<TagInputOptions>;
        
        const container = document.getElementById(options.containerId);
        const input = document.getElementById(options.inputId);
        
        if (!container || !input || !(input instanceof HTMLInputElement)) {
            throw new Error('Container or input element not found');
        }

        this.container = container;
        this.input = input;
        this.input.placeholder = this.options.placeholder;
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleTagAddition();
            } else if (e.key === 'Backspace' && this.input.value === '') {
                this.removeLastTag();
            }
        });

        this.input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const tags = pastedText.split(/[,\n\t]/).map(tag => tag.trim()).filter(Boolean);
            tags.forEach(tag => this.addTag(tag));
        });
    }

    private handleTagAddition(): void {
        const value = this.input.value.trim();
        if (value) {
            this.addTag(value);
            this.input.value = '';
        }
    }

    private addTag(tag: string): void {
        if (this.tags.size >= this.options.maxTags) {
            this.showError(`Maximum number of tags (${this.options.maxTags}) reached`);
            return;
        }

        if (!this.options.validateTag(tag)) {
            this.showError('Invalid tag');
            return;
        }

        if (!this.tags.has(tag)) {
            this.tags.add(tag);
            this.createTagElement(tag);
            this.options.onTagAdd(tag);
        }
    }

    private createTagElement(tag: string): void {
        const tagElement = document.createElement('div');
        tagElement.className = this.options.customStyles.tag;
        
        const text = document.createElement('span');
        text.textContent = tag;
        
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '×';
        removeButton.className = this.options.customStyles.removeButton;
        removeButton.addEventListener('click', () => this.removeTag(tag));

        tagElement.appendChild(text);
        tagElement.appendChild(removeButton);
        this.container.insertBefore(tagElement, this.input);
    }

    private removeTag(tag: string): void {
        this.tags.delete(tag);
        const tagElements = this.container.getElementsByClassName(this.options.customStyles.tag);
        for (const element of Array.from(tagElements)) {
            if (element instanceof HTMLElement && element.textContent?.includes(tag)) {
                element.remove();
                break;
            }
        }
        this.options.onTagRemove(tag);
    }

    private removeLastTag(): void {
        const lastTag = Array.from(this.tags).pop();
        if (lastTag) {
            this.removeTag(lastTag);
        }
    }

    private showError(message: string): void {
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = `
            fixed bottom-4 right-4 px-4 py-2
            bg-red-500 text-white rounded-lg shadow-lg
            transform transition-all duration-300 ease-out
            z-50
        `;
        errorElement.textContent = message;

        // Add to DOM and remove after delay
        document.body.appendChild(errorElement);
        setTimeout(() => {
            errorElement.style.transform = 'translateY(200%)';
            setTimeout(() => {
                document.body.removeChild(errorElement);
            }, 300);
        }, 3000);
    }

    public getTags(): string[] {
        return Array.from(this.tags);
    }

    public setTags(tags: string[]): void {
        // Clear existing tags
        this.clear();
        
        // Add new tags
        tags.forEach(tag => this.addTag(tag));
    }

    public clear(): void {
        this.tags.forEach(tag => this.removeTag(tag));
        this.tags.clear();
        this.input.value = '';
    }

    public enable(): void {
        this.input.disabled = false;
    }

    public disable(): void {
        this.input.disabled = true;
    }

    public validate(): boolean {
        return Array.from(this.tags).every(tag => this.options.validateTag(tag));
    }
}