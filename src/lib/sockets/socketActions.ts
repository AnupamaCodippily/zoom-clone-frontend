import { Socket } from "socket.io-client";

 function emitMessageToServer(username: string, message: string, clientSocket: Socket) {
    clientSocket.emit('new-message-to-server', { username, message })
}

export default [emitMessageToServer]