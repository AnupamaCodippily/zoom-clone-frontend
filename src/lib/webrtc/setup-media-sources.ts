import {
  RoomState,
  setIsDisplayingRemoteStream,
  setPlayingMediaStream,
} from "../../state/slices/room";
import { store } from "../../state/store";

/**
 * from the local navigator's user media
 */
export let localMediaStream: MediaStream | null = null;

/**
 * This can be your own stream if you are the host or the presenter
 */
let mainPresenterMediaStream: MediaStream | null = null;

// interface
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

    let localStream = new MediaStream();

    if (videoOn || audioOn) {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: videoOn,
        audio: audioOn,
      });
    }

    const result = Object.freeze({
      audio: audioOn,
      video: videoOn,
      screenshare: screenshare,
      mediaStream: localStream,
    });

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

export async function getLocalMediaStreamObject() {
  if(localMediaStream) {
    return localMediaStream;
  }

  const { isCamOn, isMicOn, isScreenShared } : RoomState = store.getState().room;

  const data = await getLocalMediaStream(isCamOn, isMicOn, isScreenShared);

  localMediaStream = data.mediaStream;

  return data.mediaStream;
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
    // localMediaStream?.getTracks().forEach((track) => track.stop());

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
}

export function setMainPresentorMediaStream(mediaStream: MediaStream) {
  mainPresenterMediaStream = mediaStream;
}

export function getMainPresentorMediaStream() {
  return mainPresenterMediaStream;
}

export async function updateLocalMediaStreamTracks(
  camera: boolean,
  audio: boolean,
  screenshare: boolean
) {
  if (camera) {
    const videoTracks = localMediaStream?.getVideoTracks();
    if (!videoTracks || !videoTracks[0]) {
      const localVideoTrack = (
        await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      ).getVideoTracks()[0];

      localMediaStream?.addTrack(localVideoTrack);
    }
  } else {
    const videoTracks = localMediaStream?.getVideoTracks();

    if (videoTracks)
      for (var i = 0; i < (videoTracks?.length ?? 0); i++) {
        localMediaStream?.removeTrack(videoTracks[i]);
      }
  }

  if (!(camera || audio || screenshare)) {
    localMediaStream = new MediaStream();
  }
}
