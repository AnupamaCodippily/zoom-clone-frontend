import Peer from "peerjs";
import { store } from "../../state/store";
import { getLocalStream } from "./setup-media-sources";

let clientPeer: Peer | null = null;

export function getPeer() {
    if (clientPeer) return clientPeer;

    clientPeer = new Peer()
    clientPeer.on('call', async (call) => {
        if (!store.getState().room.isHost) {
            const ls = await getLocalStream();
            call.answer(ls);
        }
    })

    return clientPeer;
}
