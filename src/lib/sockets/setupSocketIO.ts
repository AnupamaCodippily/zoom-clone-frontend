import { io, Socket } from "socket.io-client";
import { store } from "../../state/store";
import { tryFindLocalToken } from "../authentication/local-tokens";
import {
  ZOOM_CLONE_SERVER_URL,
} from "../constants/urls";
import socketListeners from "./socketListeners";

export interface ISocket extends Socket {}
let clientSocket: ISocket;
export default function setupSocketIOForMessages() {
  if (!clientSocket) {
    
    let token = store.getState().auth.authJwtToken;

    if (!token) {
      token = tryFindLocalToken();

      if (!token) {
        console.error('unable to setup messages channel')
        return;
      }
    }

    clientSocket = io(ZOOM_CLONE_SERVER_URL ?? "", {
      // path: '/rooms',q
      auth: { token: token },
      query: { token: token },
      reconnectionDelayMax: 1000,
      transports: ["websocket", "polling"],
      secure: true,
    });

    clientSocket.on('connect', () => console.log(clientSocket))
  }

  return clientSocket;
}

export function setupSocketListeners(clientSocket: Socket, update: any) {
  if (!clientSocket) {
    debugger;
  }

  socketListeners.forEach((action: any) => {
    action(clientSocket, update);
  });
}
