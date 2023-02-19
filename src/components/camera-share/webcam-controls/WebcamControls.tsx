import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewAudioTrackForScreenshare,
  getLocalMediaStream,
  getLocalMediaStreamObject,
  setLocalMediaStreamObject,
} from "../../../lib/webrtc/setup-media-sources";
import { setPlayingMediaStream } from "../../../state/slices/room";
import { RootState } from "../../../state/store";
import camIcon from "../../../assets/icons/video-cam-icon.png";
import micIcon from "../../../assets/icons/mic-icon-1.png";
import screenshareIcon from "../../../assets/icons/screenshare-icon.png";
import endCallIcon from "../../../assets/icons/end-call-icon-9.jpg";

const WebcamControls: React.FC = () => {
  const isMicOn = useSelector((state: RootState) => state.room.isMicOn);
  const cameraOn = useSelector((state: RootState) => state.room.isCamOn);
  const screenShareEnabled = useSelector(
    (state: RootState) => state.room.isScreenShared
  );

  const dispatch = useDispatch();

  /**
   * Toggle WebCam
   */
  async function handleClickWebcamButton() {
    const mediaStreamData = await getLocalMediaStream(
      !cameraOn,
      isMicOn,
      screenShareEnabled && !cameraOn // check here
    );
    setLocalMediaStreamObject(mediaStreamData);
  }

  /**
   * Toggle Mic
   */
  async function handleClickMicButton() {
    if (screenShareEnabled && isMicOn) {
      // setPlayingMediaStreamObjectToNull();

      const lmsObj = getLocalMediaStreamObject();
      lmsObj?.removeTrack(lmsObj.getAudioTracks()[0]);
      dispatch(
        setPlayingMediaStream({
          audio: false,
          video: false,
          screenshare: true,
        })
      );

      // setLocalMediaStreamObject(lmsObj);
    } else if (screenShareEnabled && !isMicOn) {
      // setPlayingMediaStreamObjectToNull();
      const lmsObj = getLocalMediaStreamObject();

      // create a new track
      const audioTrack = await createNewAudioTrackForScreenshare();

      if (audioTrack) {
        lmsObj?.addTrack(audioTrack);
        dispatch(
          setPlayingMediaStream({
            audio: true,
            video: false,
            screenshare: true,
          })
        );
      }

      // setLocalMediaStreamObject(lmsObj);
    } else {
      const mediaStreamData = await getLocalMediaStream(
        cameraOn,
        !isMicOn,
        screenShareEnabled
      );
      setLocalMediaStreamObject(mediaStreamData);
    }
  }

  /**
   * Toggle screenshare
   */
  async function handleClickScreenShare() {
    const mediaStreamData = await getLocalMediaStream(
      false,
      isMicOn,
      !screenShareEnabled
    );
    const { audio, screenshare, video } = mediaStreamData;
    dispatch(setPlayingMediaStream({ audio, video, screenshare }));
    setLocalMediaStreamObject(mediaStreamData);

  }

  return (
    <div className="webcam-controls">
      <div className="controls-inner">
        <button
          className={
            "turn-on-video" +
            (cameraOn ? " active-webcam-control" : " inactive-webcam-control")
          }
          onClick={() => handleClickWebcamButton()}
        >
          <img src={camIcon} alt="camera icon" />
        </button>
        <button
          className={
            "turn-on-video" +
            (isMicOn ? " active-webcam-control" : " inactive-webcam-control")
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
