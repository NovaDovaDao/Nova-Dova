// src/components/chat/ChatContainer.tsx
import React, { useState, useCallback } from 'react';
import { ChatWindow } from './ChatWindow';

interface ChatContainerProps {
  className?: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ className = '' }) => {
  const [status, setStatus] = useState<'active' | 'inactive' | 'loading'>('inactive');

  const handleActivate = useCallback(async () => {
    setStatus('loading');
    // Simulate initialization delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('active');
  }, []);

  return (
    <div className={`w-full px-4 sm:px-6 md:px-8 py-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            AI Agent Chat
          </h2>
          <p className="mt-2 text-gray-400 text-sm sm:text-base">
            Connect with your AI agent and start a conversation
          </p>
        </div>

        {/* Chat Window Wrapper - Ensures responsiveness */}
        <div className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
          <div className="absolute inset-0">
            <ChatWindow
              agentName="Nova Assistant"
              status={status}
              onActivate={handleActivate}
            />
          </div>
        </div>

        {/* Info Section - Only visible on larger screens */}
        <div className="hidden lg:block mt-8 p-6 rounded-xl bg-gray-800/30 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">
            About this AI Agent
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Capabilities</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  <span>Natural language understanding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  <span>Context-aware responses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  <span>Real-time data processing</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Models</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                  OpenAI
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                  Claude
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                  DALL-E
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;