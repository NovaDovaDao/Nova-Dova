import { ComponentProps } from "react";
import { socket } from "../socket";

export default function ConnectionManager({
  isConnected,
  ...props
}: ComponentProps<"div"> & { isConnected: boolean }) {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <div {...props}>
      {isConnected ? (
        <Button onClick={disconnect}>Disconnect</Button>
      ) : (
        <Button onClick={connect}>Connect</Button>
      )}
    </div>
  );
}

const Button = (props: ComponentProps<"button">) => (
  <button className="text-xs uppercase tracking-widest" {...props}>
    {props.children}
  </button>
);
