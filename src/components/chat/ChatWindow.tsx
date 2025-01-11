// src/components/chat/ChatWindow.tsx
import React from 'react';
import { Button } from '../ui/Button';

// interface Message {
//   id: string;
//   content: string;
//   timestamp: Date;
//   type: 'system' | 'agent' | 'user';
// }

interface ChatWindowProps {
  agentName: string;
  agentAvatar?: string;
  status: 'active' | 'inactive' | 'loading';
  onActivate?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  agentName,
  agentAvatar,
  status,
  onActivate
}) => {
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-purple-500/50">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800/50 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-space-blue to-space-purple flex items-center justify-center ${status === 'inactive' ? 'opacity-50' : ''}`}>
              {agentAvatar ? (
                <img src={agentAvatar} alt={agentName} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-lg font-bold text-white">{agentName[0]}</span>
              )}
            </div>
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
              status === 'active' ? 'bg-green-500' : 
              status === 'loading' ? 'bg-yellow-500' : 
              'bg-gray-500'
            } border-2 border-gray-800`}></span>
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {agentName}
            </h3>
            <p className="text-sm text-gray-400">
              {status === 'active' ? 'Online' : 
               status === 'loading' ? 'Initializing...' : 
               'Inactive'}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-space-blue to-space-purple p-1 animate-pulse">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          <div className="space-y-2 max-w-sm">
            <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-space-blue to-space-purple">
              Welcome to {agentName}
            </h4>
            <p className="text-gray-400 text-sm">
              This AI agent is ready to assist you. Activate the agent to start your conversation and explore its capabilities.
            </p>
          </div>
          <Button 
            onClick={onActivate}
            variant="primary"
            withGlow
            className="w-full max-w-xs"
          >
            <span className="relative z-10">Activate Agent</span>
            <div className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)]"></div>
          </Button>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-800/50 border-t border-gray-700">
        <div className="relative">
          <input
            type="text"
            disabled
            placeholder="Activate agent to start chatting..."
            className="w-full bg-gray-900/50 text-gray-300 rounded-xl px-4 py-3 pl-4 pr-12 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            disabled
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-space-blue to-space-purple text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;