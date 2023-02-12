import Peer from "peerjs";
import { store } from "../../state/store";
import { getLocalStream } from "./setup-media-sources";
import { v4, v5 } from "uuid";
import { setDisplayingRemoteStream } from "../../state/slices/room";
import servers from "../constants/ice-servers";
let clientPeer: Peer | null = null;
export let peerId = v4();

export function getPeer() {
  if (clientPeer) return clientPeer;

  clientPeer = new Peer(peerId, { config: { iceServers: servers.iceServers } });

  clientPeer.on("call", async (call) => {
    if (!store.getState().room.isHost) {
      const ls = await getLocalStream();
      alert("Answering call");
      call.answer(ls);
      store.dispatch(setDisplayingRemoteStream(true));
    }
  });

  return clientPeer;
}
