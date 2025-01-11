import React from 'react';
import { Button } from './Button';

interface AgentCardProps {
  name: string;
  description: string;
  aiModels: string[];
  onConnect?: () => void;
}

export const AgentCard = ({ name, description, aiModels, onConnect }: AgentCardProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-space-blue to-space-purple bg-clip-text text-transparent">
          {name}
        </h3>
        <p className="text-gray-300 mt-4">{description}</p>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-400">AI Model</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {aiModels.map((model, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs bg-gray-700 rounded-full text-gray-300"
              >
                {model}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-4 flex justify-end">
          <Button onClick={onConnect}>
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;