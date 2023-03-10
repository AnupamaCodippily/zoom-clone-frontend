import { MediaConnection } from "peerjs";
import { store } from "../../state/store";
import { getCallsList, setCallsList } from "../sockets/socketListeners";
import { getPeer } from "./create-peerjs-connection";
import { getLocalMediaStreamObject } from "./setup-media-sources";

export default async function restartPeerJSCall() {
  const peer = await getPeer();
  const callsList = getCallsList();

  // if (store.getState()["room"]?.isHost) {
    const newCallsList: MediaConnection[] = [];
    const ls = await getLocalMediaStreamObject();
    if (ls) {
      callsList.forEach((mediaConnection: MediaConnection) => {
        console.log("restarting call to peer " + mediaConnection.peer);
        newCallsList.push(peer.call(mediaConnection.peer, ls));
      });
      setCallsList(newCallsList);
    }
  // }
}
