// src/ts/core/PageTransitionManager.ts
import { LoadingPage } from '../components/LoadingPage';

export class PageTransitionManager {
    private static instance: PageTransitionManager;
    private loadingPage: LoadingPage;
    private currentTransition: Promise<void> | null = null;

    private constructor() {
        this.loadingPage = new LoadingPage();
    }

    public static getInstance(): PageTransitionManager {
        if (!PageTransitionManager.instance) {
            PageTransitionManager.instance = new PageTransitionManager();
        }
        return PageTransitionManager.instance;
    }

    public async transition(callback: () => Promise<void>): Promise<void> {
        if (this.currentTransition) {
            return this.currentTransition;
        }

        this.currentTransition = (async () => {
            try {
                // Show loader
                this.loadingPage.show();
                
                // Minimum loading time for visual consistency
                await Promise.all([
                    callback(),
                    new Promise(resolve => setTimeout(resolve, 1200))
                ]);
            } catch (error) {
                console.error('Transition error:', error);
            } finally {
                this.loadingPage.hide();
                this.currentTransition = null;
            }
        })();

        return this.currentTransition;
    }

    public dispose(): void {
        this.loadingPage.dispose();
    }
}