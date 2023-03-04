import {
  RoomState,
  setIsDisplayingRemoteStream,
  setPlayingMediaStream,
} from "../../state/slices/room";
import { store } from "../../state/store";
import restartPeerJSCall from "./restart-peerjs-call";

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
      setPlayingMediaStreamObjectToNull();

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

    // localMediaStream = localStream;

    return result;
  } else {
    const localStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    const result = Object.freeze({
      audio: audioOn,
      video: false,
      screenshare: true,
      mediaStream: localStream,
    });

    // localMediaStream = localStream;
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

  localMediaStream?.getTracks().forEach((track) => track.stop());
  localMediaStream = null;
}

export function setLocalMediaStreamObject(
  mediaStreamData: MediaStreamCreationData | null,
  options?: any
) {
  if (!options || !options["remoteVideo"]) {
    if (!mediaStreamData) {
      setPlayingMediaStreamObjectToNull();
      return;
    }

    const { mediaStream, audio, video, screenshare } = mediaStreamData;

    if (!mediaStream) {
      setPlayingMediaStreamObjectToNull();
      return;
    }

    if (!(audio || video || screenshare)) {
      setPlayingMediaStreamObjectToNull();
      return;
    }
    // setPlayingMediaStreamObjectToNull();
    localMediaStream?.getTracks().forEach((track) => track.stop());

    localMediaStream = mediaStreamData?.mediaStream;

    store.dispatch(setPlayingMediaStream({ audio, video, screenshare }));
  } else {
    if (options.remoteVideo) {
      if (!mediaStreamData) {
        setPlayingMediaStreamObjectToNull();
        return;
      }

      const { mediaStream, audio, video, screenshare } = mediaStreamData;

      if (!mediaStream) {
        setPlayingMediaStreamObjectToNull();
        return;
      }

      localMediaStream?.getTracks().forEach((track) => track.stop());

      localMediaStream = mediaStreamData?.mediaStream;

      store.dispatch(setPlayingMediaStream({ audio, video, screenshare }));

      store.dispatch(setIsDisplayingRemoteStream(true));
    } else {
      store.dispatch(
        setPlayingMediaStream({
          audio: false,
          video: false,
          screenshare: false,
        })
      );

      store.dispatch(setIsDisplayingRemoteStream(false));
    }
  }

  if (localMediaStream !== null && mediaStreamData) {
    const { audio, video, screenshare } = mediaStreamData;

    const { isMainPresenter, isHost }: RoomState = store.getState().room;

    const userIsPresenting = isMainPresenter || isHost;
    if (userIsPresenting && (audio || video || screenshare)) {
      restartPeerJSCall();
    }
  }
}
