import { io } from "socket.io-client";

let socket: any;
export function initSocket(userId: string) {
  if (!socket) {
    socket = io("http://localhost:3094", {
      transports: ["websocket"],
      query: {
        userId,
      },
    });
  }

  return socket;
}
