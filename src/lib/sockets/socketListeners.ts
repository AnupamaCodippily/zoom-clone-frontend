import { MediaConnection } from "peerjs";
import { Socket } from "socket.io-client";
import {
  addMessageToChat,
  updateMessageHistory,
} from "../../state/slices/chat";
import { setHostState, setParticipantsList } from "../../state/slices/room";
import { store } from "../../state/store";
import IChatMessage from "../../types/Message";
import Participant from "../../types/Participant";
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
  });
}

let callsList: MediaConnection[] = [];

function setupOnReceiveHostPeerId(socket: Socket, _: any) {
  socket.on("server-sent-host-peerId-others", async (args) => {
    console.log("The host has turned on their media");
    if (store.getState()?.room?.isHost) {
      const ls = getLocalMediaStreamObject();
      if (ls)
        args.clientIds.forEach(({ peerId }: { peerId: string }) => {
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
    store.dispatch(
      updateMessageHistory(
        args.messageHistory?.map(
          (message: any): IChatMessage => ({
            id: message.id,
            meetingName: message.meetingName,
            senderName: message.senderName,
            messageBody: message.messageBody,
            roomId: message.meetingName,
          })
        )
      )
    );
  });
}

function setupOnReceiveHostSettings(socket: Socket, _: any) {
  socket.on("server-sent-host-status-update", async (args: any) => {
    console.log("host status updated");
    if (args?.hostSettings) {
      const { isCamOn, isMicOn, isScreenShared } = args.hostSettings;
      store.dispatch(
        setHostState({
          isHostCamOn: isCamOn,
          isHostMicOn: isMicOn,
          isHostScreenShared: isScreenShared,
        })
      );
    }
  });
}

/**
 * when a new client joins, all other clients should be notified, and this listener should execute on
 * each client
 */
function onReceiveNewClientJoinedInfo(socket: Socket, _: any) {
  socket.on("server-emit-new-client-joined", async (args: any) => {
    console.log("another-client-joined-the-meeting");

    if (args?.participants) {
      const newParticipantsList: Participant[] = [];

      for (const participant of args.participants) {
        newParticipantsList.push(participant);
      }
      store.dispatch(setParticipantsList(newParticipantsList));
    }
  });
}

// TODO: refactor
export function endCalls() {
  callsList.forEach((conn) => conn?.close());
  callsList = [];
}

export function getCallsList() {
  return callsList;
}

export function setCallsList(newCallsList: MediaConnection[]) {
  callsList = newCallsList;
}
//

const allListeners = [
  setupOnReceiveMessageInRoom,
  setupOnReceiveHostPeerId,
  setupOnReceiveMessagesHistory,
  setupOnReceiveHostPeerId,
  setupOnReceiveHostSettings,
  onReceiveNewClientJoinedInfo,
];

export default allListeners;
