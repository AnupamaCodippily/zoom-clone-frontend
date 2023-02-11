import { randomUUID } from "crypto";
import Peer from "peerjs";
import { store } from "../../state/store";
import { getLocalStream } from "./setup-media-sources";

let clientPeer: Peer | null = null;
export let peerId = randomUUID();

export function getPeer() {
  if (clientPeer) return clientPeer;

  clientPeer = new Peer(peerId);

  clientPeer.on("call", async (call) => {
    if (!store.getState().room.isHost) {
      const ls = await getLocalStream();
      alert("Answering call");
      call.answer(ls);
    }
  });

  return clientPeer;
}
