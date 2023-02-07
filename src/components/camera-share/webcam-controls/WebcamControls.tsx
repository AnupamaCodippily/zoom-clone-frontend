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
import camIcon from '../../../assets/icons/video-cam-icon.png'
import micIcon from '../../../assets/icons/mic-icon-1.png'
import screenshareIcon from '../../../assets/icons/screenshare-icon.png'
import endCallIcon from '../../../assets/icons/end-call-icon-9.jpg'

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
          <img src={camIcon} alt="camera icon"/>
        </button>
        <button
          className={
            "turn-on-video" +
            (isMuted ? " active-webcam-control" : " inactive-webcam-control")
          }
          onClick={() => micOn()}
        >
          <img src={micIcon} alt='mic icon'/>
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
          <img src={ screenshareIcon} alt='screen share icon' />
        </button>
        <button className="active-webcam-control end-meeting-button">
          <img src={endCallIcon} alt="end meeting" />{" "}
        </button>
      </div>
    </div>
  );
};

export default WebcamControls;
