import { MediaConnection } from "peerjs";
import { Socket } from "socket.io-client";
import {
  addMessageToChat,
  updateMessageHistory,
} from "../../state/slices/chat";
import { addParticipant, setHostState, setParticipantsList } from "../../state/slices/room";
import { store } from "../../state/store";
import IChatMessage from "../../types/Message";
import IParticipant from "../../types/Participant";
import { getPeer } from "../webrtc/create-peerjs-connection";
import { getLocalMediaStreamObject } from "../webrtc/setup-media-sources";

/**
 * When a new message is added to the chat
 * @param socket 
 * @param updateCachedDataMethod 
 */
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

/**
 * if this is the host, they will receive the list of peerIds of participants
 */
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

/**
 * On the server acknowledging the host joined, they will receive the messages history and the list of other participants
 */
function setupOnReceiveMeetingHistory(socket: Socket, _: any) {
  socket.on("server-ack-host-joining", async (args: any) => {
    console.log("received meeting history");
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
    const participants: IParticipant[] = args?.participants ? Object.values(args.participants) : [];
    store.dispatch(setParticipantsList(participants))
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
  socket.on("server-emit-new-client-joined", (args: any) => {
    console.log("another-client-joined-the-meeting");
    if (args?.participant) {
      store.dispatch(addParticipant(args.participant))
    }
  });
}

/**
 * when a new client joins, they will be sent a list of all the other participants, including the host
 */
function onReceiveMeetingParticipantsList(socket: Socket, _: any) {
  socket.on('server-sent-client-participants-list', async (args: any) => {
    if (args?.participants) {
      const newParticipantsList: IParticipant[] = [];
      console.log(Object.values(args.participants))
      for (const participant of Object.values<IParticipant>(args.participants)) {
        newParticipantsList.push(participant);
      }
      store.dispatch(setParticipantsList(newParticipantsList));
    }
  })
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
  setupOnReceiveMeetingHistory,
  setupOnReceiveHostPeerId,
  setupOnReceiveHostSettings,
  onReceiveNewClientJoinedInfo,
  onReceiveMeetingParticipantsList,
];

export default allListeners;
