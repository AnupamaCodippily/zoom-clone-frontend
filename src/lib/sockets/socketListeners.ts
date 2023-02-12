import { Socket } from "socket.io-client";
import { addMessageToChat } from "../../state/slices/chat";
import { store } from "../../state/store";
import { getPeer } from "../webrtc/create-peerjs-connection";

function setupOnReceiveMessageInRoom(
  socket: Socket,
  updateCachedDataMethod: any
) {
  console.log("setupOnReceiveMessageInRoom");

  socket.on("server-send-messages-to-clients", (args) => {
    console.log(args);

    store.dispatch(addMessageToChat(args));

    // updateCachedDataMethod((draft: any[]) => {
    //     const { username, body }= args;
    //     console.log(draft)
    // });
  });
}

function setupOnReceiveHostPeerId(socket: Socket, _: any) {
  console.log("The host has turned on their webcam");

  socket.on("server-sent-host-peerId-others", async (args) => {
    if (store.getState()["room"].isHost) {
      const ls = store.getState().room.selfCameraStream;
      if (ls) args.clientIds.forEach((id: string) => getPeer().call(id, ls));
    }
  });
}

const allListeners = [setupOnReceiveMessageInRoom, setupOnReceiveHostPeerId];

export default allListeners;
