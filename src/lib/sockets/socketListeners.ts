import { Socket } from "socket.io-client";
import { addMessageToChat } from "../../state/slices/chat";
import { store } from "../../state/store";

function setupOnReceiveMessageInRoom (socket: Socket, updateCachedDataMethod: any) {

    console.log('setupOnReceiveMessageInRoom')

    socket.on('server-send-messages-to-clients', (args) => {
        console.log(args)

        store.dispatch(addMessageToChat(args))

        // updateCachedDataMethod((draft: any[]) => {
        //     const { username, body }= args;
        //     console.log(draft)
        // });
    })
}

export default [setupOnReceiveMessageInRoom]