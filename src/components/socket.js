// src/components/socket.js
import { io } from "socket.io-client";

// Singleton socket instance
export const socket = io("http://10.255.189.107:5000", {
  autoConnect: false, // connect manually
});
