// src/pages/Dashboard.tsx
import { usePrivy } from "@privy-io/react-auth";
import AgentCard from '../components/ui/AgentCard';
import { useNavigate } from 'react-router-dom';

const mockAgents = [
  {
    name: 'Analysis Agent',
    description: 'Processes complex datasets to extract meaningful insights',
    aiModels: ['Ollama']
  },
  {
    name: 'Research Assistant',
    description: 'Conducts thorough research and synthesizes information',
    aiModels: ['Anthropic', 'Ollama']
  },
  {
    name: 'Creative AI',
    description: 'Generates innovative ideas and creative content',
    aiModels: ['flux', 'OpenAI']
  }
];

export default function Dashboard() {
  const { user, logout } = usePrivy();
  const navigate = useNavigate();

  const handleCreateAgent = () => {
    navigate('/agent-builder');
  };

  return (
    <div className="min-h-screen">
      <header className="backdrop-blur-xl bg-gradient-to-r from-gray-900/60 via-gray-800/60 to-gray-900/60 border-b border-white/10">
        <div className="px-4 lg:px-8 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4 lg:mb-0">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <h2 className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                  AI Agents Overview
                </h2>
                <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-space-blue via-purple-500 to-space-purple transition-all duration-300"></div>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleCreateAgent}
                className="create-agent-btn group relative items-center px-4 sm:px-6 py-2 sm:py-3 overflow-hidden rounded-lg bg-gradient-to-r from-space-blue to-space-purple transition-all duration-300 ease-out hover:scale-[1.02]"
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)]"></div>
                <span className="relative font-medium text-sm sm:text-base text-white">Create Agent</span>
              </button>
              <button 
                onClick={logout}
                className="wallet-btn flex items-center gap-3 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
              >
                <span className="text-sm text-gray-300">Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="p-4 lg:p-8 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {mockAgents.map((agent, index) => (
            <AgentCard key={index} {...agent} />
          ))}
        </div>
      </main>
    </div>
  );
}