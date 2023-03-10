import { RoomState, setPlayingMediaStream } from "../../state/slices/room";
import { store } from "../../state/store";
import {
  getLocalMediaStream,
  getLocalMediaStreamObject,
  setLocalMediaStreamObject,
  setMainPresentorMediaStream,
  updateLocalMediaStreamTracks,
} from "../webrtc/setup-media-sources";
import { updateRemoteMediaStreamTracks } from "../webrtc/update-media-tracks";

export default async function updateWebcamState(camera: boolean) {
  const roomState: RoomState = store.getState().room;

  const { isMicOn, isHost, isMainPresenter, isScreenShared } = roomState;

  const lmsObj = (await getLocalMediaStream(camera, isMicOn, isScreenShared))?.mediaStream;
  setLocalMediaStreamObject({ audio: false, mediaStream: lmsObj, screenshare: isScreenShared, video: camera});
  if (lmsObj) {

    if (isMainPresenter || isHost) {
      setMainPresentorMediaStream(lmsObj);
    }

    updateLocalMediaStreamTracks(camera, isMicOn, isScreenShared);
    
    if (camera) {
      updateRemoteMediaStreamTracks(true, isMicOn, isScreenShared);
    }
    
    store.dispatch(
      setPlayingMediaStream({
        audio: false,
        screenshare: isScreenShared,
        video: camera,
      })
    );
  }
}
