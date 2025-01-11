import { io } from "socket.io-client";

const { VITE_MORPHEUS_URL } = import.meta.env;
if (!VITE_MORPHEUS_URL) throw "Missing Morpheus URL";

export const socket = io(VITE_MORPHEUS_URL, {
  reconnectionDelayMax: 10000,
  auth: (cb) => {
    cb({ token: localStorage["privy:token"].replace(/['"]+/g, "") });
  },
});
