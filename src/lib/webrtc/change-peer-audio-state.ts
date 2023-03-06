import { MediaConnection } from "peerjs";
import { RoomState } from "../../state/slices/room";
import { store } from "../../state/store";
import { getCallsList } from "../sockets/socketListeners";

export async function changeHostPeerAudioState(audioOn: boolean) {
  const roomState: RoomState = store.getState().room;
  if (roomState.isMainPresenter || roomState.isHost) {
    const callsList = getCallsList();
    const audioTrack: MediaStreamTrack = (
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
    ).getAudioTracks()[0];
    if (audioOn) {
      for (const call of callsList) {
        call.peerConnection.addTrack(audioTrack);
      }
    } else {
      callsList.forEach((call: MediaConnection) => {
        call.remoteStream.removeTrack(call.remoteStream.getAudioTracks()[0]);
      });
    }
  }
}



export async function changeAudiencePeerAudioState(audioOn: boolean) {
    const roomState: RoomState = store.getState().room;
    if (roomState.isMainPresenter || roomState.isHost) {
      const callsList = getCallsList();
      const audioTrack: MediaStreamTrack = (
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
      ).getAudioTracks()[0];
      if (audioOn) {
        for (const call of callsList) {
          call.peerConnection.addTrack(audioTrack);
        }
      } else {
        callsList.forEach((call: MediaConnection) => {
          call.remoteStream.removeTrack(call.remoteStream.getAudioTracks()[0]);
        });
      }
    }
  }
