import { useState, useEffect } from "react";
import { socket } from "../socket";
import Events from "./Events";
import DashboardForm from "./DashboardForm";
import ConnectionManager from "./ConnectionManager";

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: string) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("response", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("response", onFooEvent);
    };
  }, []);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="text-white">
      <main className="p-8">
        <Events events={fooEvents} />
      </main>
      <ConnectionManager
        isConnected={isConnected}
        className=" fixed top-8 right-8"
      />
      <DashboardForm
        className=" fixed bottom-8 inset-x-8"
        disabled={!isConnected}
      />
    </div>
  );
}
