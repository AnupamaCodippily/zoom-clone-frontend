import Peer from "peerjs";
import room, { RoomState } from "../../state/slices/room";
import { store } from "../../state/store";
import Participant from "../../types/Participant";
import { setCallsList } from "../sockets/socketListeners";
import { getPeer } from "./create-peerjs-connection";
import {
  getLocalMediaStream,
  getLocalMediaStreamObject,
  setLocalMediaStreamObject,
} from "./setup-media-sources";

/**
 * When this user joins a meeting, the user needs to connect to all other peers in the meeting
 */
export default async function makeCallsToAllOtherParticipants(
  participants: Participant[],
  stream?: MediaStream
) {
  const peer = await getPeer();

  if (peer.open) {
    makeCallsToAllOtherParticipantsImpl(participants, peer, stream);
    return;
  }

  peer.on("open", async () => {
    makeCallsToAllOtherParticipantsImpl(participants, peer, stream);
  });
}

const makeCallsToAllOtherParticipantsImpl = async (
  participants: Participant[],
  peer: Peer,
  stream?: MediaStream
) => {

  const isHost = store.getState().room.isHost;
  const isPresenter = store.getState().room.isMainPresenter;

  // const roomState: RoomState = store.getState().room;

  // const { isCamOn, isMicOn, isScreenShared } = roomState;

  let mediaStream = stream ?? (await getLocalMediaStreamObject());

  console.log("I am sending this stream through a call:", mediaStream?.id);

  // debugger;
  if (mediaStream) {
    const callsList = [];

    for (const participant of participants) {
      if (
        peer.id !== participant.peerId &&
        !(isHost && participant.name === "host")
      ) {
        const call = peer.call(participant.peerId, mediaStream, {
          metadata: { isHost, isPresenter },
        });
        callsList.push(call);

        console.log("calling " + participant.name, participant.peerId);
      }
    }

    setCallsList(callsList);
  }
};
