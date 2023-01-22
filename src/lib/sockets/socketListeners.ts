import { Socket } from "socket.io-client";

function setupOnReceiveMessageInRoom (socket: Socket, updateCachedDataMethod: any) {
    socket.on('server-send-messages-to-clients', (...args) => {
        debugger;
        console.log(args)

        updateCachedDataMethod('asdasd');
    })
}

export default [setupOnReceiveMessageInRoom]