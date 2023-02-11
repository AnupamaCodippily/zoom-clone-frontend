import { io, Socket } from "socket.io-client";
import {
  ZOOM_CLONE_SERVER_URL,
} from "../constants/urls";
import socketListeners from "./socketListeners";

export interface ISocket extends Socket {}
let clientSocket: ISocket;
export default function setupSocketIOForMessages() {
  if (!clientSocket) {
    
    clientSocket = io(ZOOM_CLONE_SERVER_URL ?? "", {
      // path: '/rooms',
      reconnectionDelayMax: 1000,
      transports: ["websocket", "polling"],
      secure: true
    });

    clientSocket.on('connect', () => console.log(clientSocket))
  }

  return clientSocket;
}

export function setupSocketListeners(clientSocket: Socket, update: any) {
  if (!clientSocket) debugger;

  socketListeners.forEach((action: any) => {
    action(clientSocket, update);
  });
}
