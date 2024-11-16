import { createContext } from "react";
import { io } from "socket.io-client";

const BASEURL = import.meta.env.VITE_APP_WEBSOCKET_URL;

export const socket = io(BASEURL, {
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

export const SocketContext = createContext(socket);
