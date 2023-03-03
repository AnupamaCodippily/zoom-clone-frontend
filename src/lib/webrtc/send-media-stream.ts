import { getPeer } from "./create-peerjs-connection";
import {
  getLocalMediaStreamObject,
} from "./setup-media-sources";

export async function sendMediaStream(destinationPeers: string[]) {
  const localMediaStream = getLocalMediaStreamObject();

  const peer = getPeer();

  if (localMediaStream !== null)
    for (const destinationPeer of destinationPeers) {
      peer.call(destinationPeer, localMediaStream);
    }
}
