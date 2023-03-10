import { RoomState, setPlayingMediaStream } from "../../state/slices/room";
import { store } from "../../state/store";
import { changeHostPeerAudioState } from "../webrtc/change-peer-audio-state";
import { getLocalMediaStream, getLocalMediaStreamObject, setLocalMediaStreamObject } from "../webrtc/setup-media-sources";

/**
 * 
 */
export default async function handleMicToggle(): Promise<void> {
  const roomState: RoomState = store.getState().room;
  const  { isCamOn, isHost, isMicOn, isScreenShared } = roomState;
  if (isHost) {
    if (isMicOn) {
      turnHostMicOff();
    } else {
      turnHostMicOn();
    }
  }

  store.dispatch(setPlayingMediaStream({
    video: isCamOn,
    audio: !isMicOn,
    screenshare: isScreenShared
  }))
}

/**
 * If the host is currently streaming video without audio, this needs to be called
 * The global state will be updated => room.isMicOn: true
 */
async function turnHostMicOn() {
  // we need to confirm whether the localmediastream is not null, i.e., we currently have a connection
  // ... whose audio state we can update
  if (getLocalMediaStreamObject() !== null) {
    await changeHostPeerAudioState(true);
  } else {
    const mediaStreamData = await getLocalMediaStream(false, true, false);
    setLocalMediaStreamObject(mediaStreamData, {
      remoteVideo: false,
    });
  }
}

/**
 * If the host is currently streaming video with audio, this needs to be called
 * needs to delete the audiotracks of the peerjs connection
 * The global state will be updated => room.isMicOn: false
 */
export async function turnHostMicOff() {
    await changeHostPeerAudioState(false);
}

export async function turnAudienceMemberMicOn() {}

export async function turnAudienceMemberMicOff() {}
