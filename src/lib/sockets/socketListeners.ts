import { MediaConnection } from "peerjs";
import { Socket } from "socket.io-client";
import {
  addMessageToChat,
  updateMessageHistory,
} from "../../state/slices/chat";
import { store } from "../../state/store";
import IChatMessage from "../../types/Message";
import { getPeer } from "../webrtc/create-peerjs-connection";
import { getLocalMediaStreamObject } from "../webrtc/setup-media-sources";

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

let callsList: MediaConnection[] = [];

function setupOnReceiveHostPeerId(socket: Socket, _: any) {
  socket.on("server-sent-host-peerId-others", async (args) => {
    console.log("The host has turned on their webcam");
    if (store.getState()["room"].isHost) {
      const ls = getLocalMediaStreamObject();
      if (ls)
        args.clientIds.forEach(({peerId} : { peerId: string }) => {
          const mediaConnection = getPeer().call(peerId, ls);
          callsList.push(mediaConnection);
          return mediaConnection;
        });
    }
  });
}

function setupOnReceiveMessagesHistory(socket: Socket, _: any) {
  socket.on("server-ack-client-joining", async (args: any) => {
    console.log("received messages history");
    console.log(args)
    store.dispatch(
      updateMessageHistory(
        args.messageHistory?.map(
          (message: any): IChatMessage => ({
            id: message.id,
            meetingName: message.meetingName,
            senderName: message.senderName,
            messageBody: message.messageBody,
            roomId: message.meetingName
          })
        )
      )
    );
  });
}

// TODO: refactor
export function endCalls() {
  callsList.forEach((conn) => conn?.close());
  callsList = [];
}

const allListeners = [setupOnReceiveMessageInRoom, setupOnReceiveHostPeerId, setupOnReceiveMessagesHistory];

export default allListeners;
