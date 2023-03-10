import Peer from "peerjs";
import { store } from "../../state/store";
import { v4 } from "uuid";
import { setIsDisplayingRemoteStream } from "../../state/slices/room";
import servers from "../constants/ice-servers";
import {
  getLocalMediaStreamObject,
  setLocalMediaStreamObject,
  setMainPresentorMediaStream,
} from "./setup-media-sources";
import { getCallsList, setCallsList } from "../sockets/socketListeners";

let clientPeer: Peer | null = null;
export let peerId = localStorage.getItem("germoda-peer-id") ?? v4();

localStorage.setItem("germoda-peer-id", peerId);

export async function getPeer() {
  if (clientPeer) return clientPeer;

  clientPeer = new Peer(peerId, { config: { iceServers: servers.iceServers } });

  clientPeer.on("call", async (call) => {
    setCallsList(getCallsList().concat(call));
    console.log("call received");

    const ownMediaStream: MediaStream | null =
      await getLocalMediaStreamObject();

    if (!ownMediaStream) return;

	setTimeout(() => {
		call.answer(ownMediaStream);
		console.log("call answered with my media stream: " + ownMediaStream.id);
	}, 4000)

	call.on('error', (err) => {
		alert('call err')
		console.log(err)
	}) 

    call.on("stream", (stream: any) => {
      console.log("receive stream ", stream.id);

      const { isMainPresenter, isHost } = store.getState().room;

      if (isMainPresenter || isHost) {
        setLocalMediaStreamObject(
          {
            video: false,
            audio: false,
            screenshare: false,
            mediaStream: stream,
          },
          { remoteVideo: true }
        );
      } else {
        store.dispatch(setIsDisplayingRemoteStream(true));
        setMainPresentorMediaStream(stream);
      }
    });

    call.on("iceStateChanged", (state) => {
      console.log("host " + state);

      if (state === "disconnected") {
        setLocalMediaStreamObject(
          {
            audio: false,
            video: false,
            screenshare: false,
            mediaStream: null,
          },
          { remoteVideo: false }
        );

        store.dispatch(setIsDisplayingRemoteStream(false));
      }
    });
    // }
  });

  return clientPeer;
}
