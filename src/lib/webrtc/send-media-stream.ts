import { getPeer } from "./create-peerjs-connection";
import {
  getLocalMediaStreamObject,
} from "./setup-media-sources";

export async function sendMediaStream(destinationPeers: string[]) {
  const localMediaStream =await getLocalMediaStreamObject();

  const peer = await getPeer();

  if (localMediaStream !== null)
    for (const destinationPeer of destinationPeers) {
      peer.call(destinationPeer, localMediaStream);
    }
}
