import Peer from "peerjs";
import { store } from "../../state/store";
import { v4 } from "uuid";
import { setPlayingMediaStream } from "../../state/slices/room";
import servers from "../constants/ice-servers";

let clientPeer: Peer | null = null;
export let peerId = v4();

export function getPeer() {
  if (clientPeer) return clientPeer;

  clientPeer = new Peer(peerId, { config: { iceServers: servers.iceServers } });

  clientPeer.on("call", (call) => {
    if (!store.getState().room.isHost) {
      alert("Answering call");
      call.answer();
      call.on("stream", (stream: MediaStream) => {
        // `stream` is the MediaStream of the remote peer.
        store.dispatch(
          setPlayingMediaStream({
            mediaStream: stream,
            audio: false,
            video: false,
            screenshare: false,
          })
        );
      });
    }
  });

  return clientPeer;
}
