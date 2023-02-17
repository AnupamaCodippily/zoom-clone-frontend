import {
  MediaStreamData,
} from "../../state/slices/room";

export async function getLocalMediaStream(
  videoOn: boolean,
  audioOn: boolean,
  screenshare: boolean
): Promise<MediaStreamData> {
  if (videoOn) {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: videoOn,
      audio: audioOn,
    });

    const result = Object.freeze({
      audio: audioOn,
      video: true,
      screenshare: false,
      mediaStream: localStream,
    });

    return result;
  } else {
    const localStream = await navigator.mediaDevices.getDisplayMedia({
      video: false,
      audio: audioOn,
    });
    const result = Object.freeze({
      audio: audioOn,
      video: false,
      screenshare: true,
      mediaStream: localStream,
    });
    return result;
  }
}
