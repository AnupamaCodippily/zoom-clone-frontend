import { RoomState, setPlayingMediaStream } from "../../state/slices/room";
import { store } from "../../state/store";
import {
  getLocalMediaStreamObject,
  setMainPresentorMediaStream,
  updateLocalMediaStreamTracks,
} from "../webrtc/setup-media-sources";
import { updateRemoteMediaStreamTracks } from "../webrtc/update-media-tracks";

export default async function updateWebcamState(camera: boolean) {
  const roomState: RoomState = store.getState().room;

  const { isMicOn, isHost, isMainPresenter, isScreenShared } = roomState;

  const lmsObj = await getLocalMediaStreamObject();

  if (lmsObj) {
    updateLocalMediaStreamTracks(camera, isMicOn, isScreenShared);

    store.dispatch(
      setPlayingMediaStream({
        audio: false,
        screenshare: isScreenShared,
        video: camera,
      })
    );

    if (camera) {
      updateRemoteMediaStreamTracks(true, isMicOn, isScreenShared);
    }

    if (isMainPresenter || isHost) {
      setMainPresentorMediaStream(lmsObj);
    }
  }
}
