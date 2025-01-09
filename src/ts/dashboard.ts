import '../styles/main.css';
import { DashboardComponent } from './components/DashboardComponent';
import { AgentCard } from './components/AgentCard';

document.addEventListener('DOMContentLoaded', async () => {
    const dashboard = new DashboardComponent();
    await dashboard.initialize();
});
