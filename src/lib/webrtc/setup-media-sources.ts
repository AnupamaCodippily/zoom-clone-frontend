import { setPlayingMediaStream } from "../../state/slices/room";
import { store } from "../../state/store";

export let localMediaStream: MediaStream | null = null;

export type MediaStreamCreationData = {
  video: boolean;
  audio: boolean;
  screenshare: boolean;
  mediaStream: MediaStream | null;
};

/**
 * When screensharing, the audio track tends to fail or needs to be restarted.
 * This is a workaround, in which we create the track separately
 */
export async function createNewAudioTrackForScreenshare() {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  });

  const result = localStream.getAudioTracks()[0];

  return result;
}

export async function getLocalMediaStream(
  videoOn: boolean,
  audioOn: boolean,
  screenshare: boolean
): Promise<MediaStreamCreationData> {
  if (!screenshare) {
    if (!(audioOn || videoOn)) {
      return {
        audio: audioOn,
        video: videoOn,
        screenshare: screenshare,
        mediaStream: null,
      };
    }

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: videoOn,
      audio: audioOn,
    });

    const result = Object.freeze({
      audio: audioOn,
      video: videoOn,
      screenshare: screenshare,
      mediaStream: localStream,
    });

    localMediaStream = localStream;

    return result;
  } else {
    const localStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    const result = Object.freeze({
      audio: false,
      video: false,
      screenshare: true,
      mediaStream: localStream,
    });

    localMediaStream = localStream;
    return result;
  }
}

export function getLocalMediaStreamObject() {
  return localMediaStream;
}

export function setPlayingMediaStreamObjectToNull() {
  store.dispatch(
    setPlayingMediaStream({
      screenshare: false,
      video: false,
      audio: false,
    })
  );
}

export function setLocalMediaStreamObject(mediaStream: MediaStream | null) {
  localMediaStream = mediaStream;
}
