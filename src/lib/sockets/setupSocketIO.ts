import { io, Socket } from "socket.io-client";
import { ZOOM_CLONE_SERVER_URL } from "../constants/urls";
import socketListeners from "./socketListeners";

export interface ISocket extends Socket {

}

export default function setupSocketIOForMessages() {
  const clientSocket: ISocket= io(ZOOM_CLONE_SERVER_URL, {
    reconnectionDelayMax: 10000,
  });

  return clientSocket;
}


export function setupSocketListeners (clientSocket: Socket) {
    socketListeners.forEach((action: any) => {
        action(clientSocket)
    })
}
