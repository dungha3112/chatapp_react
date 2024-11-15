import { createContext } from "react";
import { io } from "socket.io-client";

const BASEURL = import.meta.env.VITE_APP_WEBSOCKET_URL;

export const socket = io(BASEURL, {
  withCredentials: true,
});

export const SocketContext = createContext(socket);
