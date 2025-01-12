import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

interface WebSocketContextType {
  socket: Socket | null;
  connected: boolean;
  error: string | null;
  sendMessage: (message: string) => void;
  balance: string;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null
);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
