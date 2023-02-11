import { Socket } from "socket.io-client";
import { addMessageToChat } from "../../state/slices/chat";
import { RootState, store } from "../../state/store";
import { getPeer } from "../webrtc/create-peerjs-connection";
import { getLocalStream } from "../webrtc/setup-media-sources";

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
      const ls = await getLocalStream();
      args.clientIds.forEach((id: string) => getPeer().call(id, ls));
    }
  });
}

export default [setupOnReceiveMessageInRoom, setupOnReceiveHostPeerId];
