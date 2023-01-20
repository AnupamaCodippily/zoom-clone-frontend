import { Socket } from "socket.io-client";

function setupOnReceiveMessageInRoom (socket: Socket) {
    socket.on('new-message-from-server-to-room', (...args) => {
        console.log(args)
    })
}

export default [setupOnReceiveMessageInRoom]