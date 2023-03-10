import { store } from "../../state/store";
import makeCallsToAllOtherParticipants from "./make-calls-to-participants";
import {
  getLocalMediaStreamObject,
} from "./setup-media-sources";

export async function updateRemoteMediaStreamTracks(
  camera: boolean,
  audio: boolean,
  screenshare: boolean
) {
  
  const allPeers = store.getState().room.participants;
  
  if (!(camera || audio || screenshare)) {
    const emptyMediaStream = new MediaStream();
    makeCallsToAllOtherParticipants(allPeers, emptyMediaStream);
    return;
  }
  
  const localMediaStream: MediaStream | null = await getLocalMediaStreamObject();

  if (localMediaStream) {
    makeCallsToAllOtherParticipants(allPeers, localMediaStream);
  }
}
