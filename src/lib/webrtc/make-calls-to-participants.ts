import Participant from "../../types/Participant";
import { setCallsList } from "../sockets/socketListeners";
import { getPeer } from "./create-peerjs-connection";
import {
  getLocalMediaStream,
  getLocalMediaStreamObject,
} from "./setup-media-sources";

/**
 * When this user joins a meeting, the user needs to connect to all other peers in the meeting
 */
export default async function makeCallsToAllOtherParticipants(
  participants: Participant[]
) {
  const peer = getPeer();

  let mediaStream = getLocalMediaStreamObject();

  if (!mediaStream) {
    mediaStream = (await getLocalMediaStream(false, false, false)).mediaStream;
  }

  if (mediaStream) {

    const callsList = [];

    for (const participant of participants) {
      const call = peer.call(participant.peerId, mediaStream);
      callsList.push(call);
    }

    setCallsList(callsList)
  }
}
