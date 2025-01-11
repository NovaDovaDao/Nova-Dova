// src/components/chat/ChatWindow.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { useWebSocket } from '../../context/WebSocketContext';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  type: 'system' | 'agent' | 'user';
}

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { connected, sendMessage, error, tokenBalance } = useWebSocket();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    sendMessage(inputValue);
    setInputValue('');
  };

  const renderMessage = (message: Message) => (
    <div
      key={message.id}
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-xl px-4 py-2 ${
          message.type === 'user'
            ? 'bg-space-purple/20 text-white'
            : 'bg-gray-800/50 text-gray-200'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs text-gray-400 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );

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
              connected ? 'bg-green-500' : 
              status === 'loading' ? 'bg-yellow-500' : 
              'bg-gray-500'
            } border-2 border-gray-800`}></span>
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {agentName}
            </h3>
            <div className="flex flex-col">
              <p className="text-sm text-gray-400">
                {connected ? 'Connected' : 
                 status === 'loading' ? 'Connecting...' : 
                 'Disconnected'}
              </p>
              {tokenBalance && connected && (
                <p className="text-sm text-emerald-400">
                  Balance: {tokenBalance} DOVA
                </p>
              )}
              {error && (
                <p className="text-sm text-red-400">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length > 0 ? (
          <>
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </>
        ) : (
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
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">
                  {error ? (
                    <span className="text-red-400">{error}</span>
                  ) : (
                    "Connect your Solana wallet with 100000 $DOVA tokens to start chatting."
                  )}
                </p>
                {tokenBalance && (
                  <p className="text-emerald-400 text-sm">
                    Current Balance: {tokenBalance} DOVA
                  </p>
                )}
              </div>
            </div>
            {!connected && (
              <Button 
                onClick={onActivate}
                variant="primary"
                withGlow
                className="w-full max-w-xs"
              >
                Connect
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-800/50 border-t border-gray-700">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!connected}
            placeholder={connected ? "Type your message..." : "Connect to start chatting..."}
            className="w-full bg-gray-900/50 text-gray-300 rounded-xl px-4 py-3 pl-4 pr-12 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!connected || !inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-space-blue to-space-purple text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:opacity-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;