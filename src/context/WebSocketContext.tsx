// src/context/WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { usePrivy } from "@privy-io/react-auth";

interface WebSocketContextType {
  socket: Socket | null;
  connected: boolean;
  error: string | null;
  sendMessage: (message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

// interface Message {
//   content: string;
//   type: 'user' | 'agent';
//   timestamp: Date;
// }

// Get WebSocket URL based on environment
const getWebSocketUrl = () => {
  // Default to production URL
  let wsUrl = 'https://comfortable-butterfly-26.deno.dev';
  
  // Check if we're in development mode
  if (import.meta.env.DEV && import.meta.env.VITE_WEBSOCKET_URL) {
    wsUrl = import.meta.env.VITE_WEBSOCKET_URL;
  }
  
  console.log('Using WebSocket URL:', wsUrl);
  return wsUrl;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getAccessToken } = usePrivy();

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const token = await getAccessToken();
        if (!token) {
          setError('No authentication token available');
          return;
        }

        // Initialize socket with the appropriate URL
        const socketInstance = io(getWebSocketUrl(), {
          auth: {
            token
          },
          transports: ['websocket'],
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000
        });

        // Connection event handlers
        socketInstance.on('connect', () => {
          console.log('Connected to WebSocket');
          setConnected(true);
          setError(null);
        });

        socketInstance.on('connect_error', (err) => {
          console.error('Connection error:', err);
          setError(`Connection error: ${err.message}`);
          setConnected(false);
        });

        socketInstance.on('disconnect', (reason) => {
          console.log('Disconnected from WebSocket:', reason);
          setConnected(false);
          if (reason === 'io server disconnect') {
            // Server initiated disconnect, attempt to reconnect
            socketInstance.connect();
          }
        });

        socketInstance.on('error', (error: string) => {
          console.error('WebSocket error:', error);
          setError(error);
        });

        socketInstance.on('response', (response: string) => {
          console.log('Received response:', response);
          // You can add additional handling here if needed
        });

        setSocket(socketInstance);

        // Cleanup on unmount
        return () => {
          console.log('Cleaning up socket connection');
          socketInstance.disconnect();
        };
      } catch (err) {
        console.error('Socket initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to connect to WebSocket');
      }
    };

    initializeSocket();
  }, [getAccessToken]);

  const sendMessage = (message: string) => {
    if (!socket) {
      setError('Socket not initialized');
      return;
    }
    
    if (!connected) {
      setError('Not connected to WebSocket');
      return;
    }

    try {
      socket.emit('input', message);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  const contextValue = {
    socket,
    connected,
    error,
    sendMessage
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};