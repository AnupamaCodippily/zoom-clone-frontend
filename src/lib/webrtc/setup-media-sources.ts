import { store } from "../../state/store";
export async function setupSelfMediaVideoOnly(
  peerConnection: RTCPeerConnection
) {
  const localStream = store.getState().room.selfCameraStream;

  if (localStream !== null) {
    localStream.getTracks().forEach((track: MediaStreamTrack) => {
      if (localStream != null)
        return peerConnection.addTrack(track, localStream);
    });
  }
}

export async function setupSelfMediaVideoAndAudioOnly(
  peerConnection: RTCPeerConnection
) {
  const localStream = store.getState().room.selfCameraStream;

  if (localStream !== null) {
    localStream.getTracks().forEach((track: MediaStreamTrack) => {
      if (localStream != null)
        return peerConnection.addTrack(track, localStream);
    });
  }
}

export async function getLocalStream(): Promise<MediaStream> {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  return localStream;
}

export async function getLocalStreamWithScreen(): Promise<MediaStream> {
  const localStream = await navigator.mediaDevices.getDisplayMedia({ audio: false});

  return localStream;
}

export async function getLocalStreamVideoAndAudio(
  videoOn: boolean,
  audioOn: boolean
): Promise<MediaStream> {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: videoOn,
    audio: audioOn,
  });

  return localStream;
}
