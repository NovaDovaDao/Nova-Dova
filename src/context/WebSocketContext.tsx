// src/context/WebSocketContext.tsx
import React, { useEffect, useState } from "react";
import { WebSocketContext } from "@/hooks/useWebsocket";
import { socket } from "@/socket";
import { usePrivy } from "@privy-io/react-auth";

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState("0");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onConnect = () => {
      console.log("Connected to WebSocket");
      setConnected(true);
      setError(null);
    };

    const onConnectError = (err: Error) => {
      console.error("Connection error:", err);
      setError(`Connection error: ${err.message}`);
      setConnected(false);
    };

    const onDisconnect = (reason: string) => {
      console.log("Disconnected from WebSocket:", reason);
      setConnected(false);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    };

    const onError = (error: string) => {
      console.error("WebSocket error:", error);
      setError(error);
    };

    const onResponse = (response: string) => {
      console.log("Received response:", response);
    };

    const onBalance = (value: string) => {
      setBalance(value);
    };

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("disconnect", onDisconnect);

    socket.on("error", onError);
    socket.on("balance", onBalance);
    socket.on("response", onResponse);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("disconnect", onDisconnect);

      socket.off("error", onError);
      socket.off("balance", onBalance);
      socket.off("response", onResponse);
    };
  }, []);

  const { authenticated } = usePrivy();
  useEffect(() => {
    // no-op if the socket is already connected
    if (authenticated) socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [authenticated]);

  const sendMessage = (message: string) => {
    if (!socket) {
      setError("Socket not initialized");
      return;
    }

    if (!connected) {
      setError("Not connected to WebSocket");
      return;
    }

    try {
      socket.emit("input", message);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        connected,
        error,
        sendMessage,
        balance,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
