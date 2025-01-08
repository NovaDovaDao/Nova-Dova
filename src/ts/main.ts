import '../styles/main.css'
import { Hero } from './components/Hero'
import { Navigation } from './components/Navigation'
import { AIInterface } from './components/AIInterface'
import { AnimationLoop } from './core/AnimationLoop'

document.addEventListener('DOMContentLoaded', () => {
    const hero = new Hero(document.getElementById('heroCanvas') as HTMLElement)
    const nav = new Navigation()
    const aiInterface = new AIInterface('aiInterface')

    const animationLoop = new AnimationLoop()
    animationLoop.addAnimation((deltaTime) => hero.update(deltaTime))
    animationLoop.start()
})
