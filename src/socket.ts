import { io } from "socket.io-client";

const { VITE_WEBSOCKET_URL } = import.meta.env;
if (!VITE_WEBSOCKET_URL) throw "Missing Websocket URL";

export const socket = io(VITE_WEBSOCKET_URL, {
  reconnectionDelayMax: 10000,
  auth: (cb) => {
    cb({ token: localStorage["privy:token"]?.replace(/['"]+/g, "") });
  },
  autoConnect: false,
  reconnectionAttempts: 5,
});
