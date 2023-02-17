import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalMediaStream } from "../../../lib/webrtc/setup-media-sources";
import { setPlayingMediaStream } from "../../../state/slices/room";
import { RootState } from "../../../state/store";
import camIcon from "../../../assets/icons/video-cam-icon.png";
import micIcon from "../../../assets/icons/mic-icon-1.png";
import screenshareIcon from "../../../assets/icons/screenshare-icon.png";
import endCallIcon from "../../../assets/icons/end-call-icon-9.jpg";

const WebcamControls: React.FC = () => {
  const isMuted = useSelector((state: RootState) => state.room.isMuted);
  const enableCam = useSelector((state: RootState) => state.room.isCamOn);
  const screenShareEnabled = useSelector(
    (state: RootState) => state.room.isScreenShared
  );

  const dispatch = useDispatch();

  async function handleClickWebcamButton() {
    if (!enableCam) {
      const mediaStreamData = await getLocalMediaStream(true, !isMuted, false);

      dispatch(setPlayingMediaStream(mediaStreamData));
    } else {
      const mediaStreamData = await getLocalMediaStream(
        false,
        !isMuted,
        screenShareEnabled
      );

      dispatch(setPlayingMediaStream(mediaStreamData));
    }

    // turnOn();
  }

  async function handleClickMicButton() {
    if (isMuted) {
      const mediaStreamData = await getLocalMediaStream(
        enableCam,
        true,
        screenShareEnabled
      );
      dispatch(setPlayingMediaStream(mediaStreamData));
    } else {
      const mediaStreamData = await getLocalMediaStream(
        enableCam,
        false,
        screenShareEnabled
      );

      dispatch(setPlayingMediaStream(mediaStreamData));
    }
  }

  async function handleClickScreenShare() {
    if (isMuted) {
      const mediaStreamData = await getLocalMediaStream(
        false,
        !isMuted,
        true
      );
      dispatch(setPlayingMediaStream(mediaStreamData));
    } else {
      const mediaStreamData = await getLocalMediaStream(
        enableCam,
        !isMuted,
        false
      );

      dispatch(setPlayingMediaStream(mediaStreamData));
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
          <img src={camIcon} alt="camera icon" />
        </button>
        <button
          className={
            "turn-on-video" +
            (isMuted ? " active-webcam-control" : " inactive-webcam-control")
          }
          onClick={() => handleClickMicButton()}
        >
          <img src={micIcon} alt="mic icon" />
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
          <img src={screenshareIcon} alt="screen share icon" />
        </button>
        <button className="active-webcam-control end-meeting-button">
          <img src={endCallIcon} alt="end meeting" />{" "}
        </button>
      </div>
    </div>
  );
};

export default WebcamControls;
