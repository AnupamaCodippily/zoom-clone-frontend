import React from "react";
import { useSelector } from "react-redux";
import {
  getLocalStream,
  getLocalStreamWithScreen,
} from "../../../lib/webrtc/setup-media-sources";
import {
  setCamOn,
  setLocalCam,
  setLocalDisplayStream,
} from "../../../state/slices/room";
import { RootState, store } from "../../../state/store";

interface WebcamControlsProps {
  turnOn: () => void;
  micOn: () => void;
}

const WebcamControls: React.FC<WebcamControlsProps> = ({ turnOn, micOn }) => {
  const isMuted = useSelector((state: RootState) => state.room.isMuted);
  const enableCam = useSelector((state: RootState) => state.room.isCamOn);
  const screenShareEnabled = useSelector(
    (state: RootState) => state.room.isScreenShared
  );

  async function handleClickWebcamButton() {
    if (!enableCam) {
      const localStreamSrc = await getLocalStream();
      store.dispatch(setLocalCam(localStreamSrc));
    } else {
      store.dispatch(setLocalCam(null));
    }

    turnOn();
  }

  async function handleClickScreenShare() {
    if (!screenShareEnabled) {
      const localStreamSrc = await getLocalStreamWithScreen();
      store.dispatch(setLocalDisplayStream(localStreamSrc));
      store.dispatch(setCamOn(false));
    } else {
      store.dispatch(setLocalDisplayStream(null));
    }
  }

  return (
    <div className="webcam-controls">
      <div className="controls-inner">
        <button
          className={
            "turn-on-video" +
            (enableCam ? " active-webcam-control" : " inactive-webcam-control")
          }
          onClick={handleClickWebcamButton}
        >
          Video
        </button>
        <button
          className={
            "turn-on-video" +
            (isMuted ? " active-webcam-control" : " inactive-webcam-control")
          }
          onClick={() => micOn()}
        >
          Mic
        </button>
        <button
          className={
            "turn-on-video" +
            (screenShareEnabled
              ? " active-webcam-control"
              : " inactive-webcam-control")
          }
          onClick={() => handleClickScreenShare()}
        >
          Share screen
        </button>
        <button className="active-webcam-control end-meeting-button">
          <img src="" alt="end meeting" />{" "}
        </button>
      </div>
    </div>
  );
};

export default WebcamControls;
