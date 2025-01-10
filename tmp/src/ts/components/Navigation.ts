// File: src/ts/components/Navigation.ts
export class Navigation {
    private element: HTMLElement;

    constructor() {
        this.element = document.createElement('nav');
        this.element.classList.add('navigation');
        this.initialize();
    }

    private initialize(): void {
        this.element.innerHTML = `
            <div class="navigation__content">
                <div class="navigation__logo">NOVA DOVA DAO</div>
                <div class="navigation__links">
                    <a href="#about">About</a>
                    <a href="#interface">Interface</a>
                    <a href="#connect">Connect</a>
                </div>
            </div>
        `;

        document.body.appendChild(this.element);
    }
}
