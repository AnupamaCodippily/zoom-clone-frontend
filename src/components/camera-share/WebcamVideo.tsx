import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import WebcamControls from "./webcam-controls/WebcamControls";
import WebcamOff from "./WebcamOff";
import WebcamOn from "./WebcamOn";
import {
  setCamOn,
  setMuted,
} from "../../state/slices/room";
import { addHostToMeetingWithVideo } from "../../lib/sockets/video-sharing-events";

const WebcamVideo: React.FC = () => {
  const isWebcamOn = useSelector((state: RootState) => state.room.isCamOn);
  const isMuted = useSelector((state: RootState) => state.room.isMuted);
  const isRemoteScreenSharing = useSelector((state: RootState) => state.room.displayingRemoteStream);
  const isScreenShared = useSelector(
    (state: RootState) => state.room.isScreenShared
  );

  const isHost = useSelector((state: RootState) => state.room.isHost)
  const dispatch = useDispatch();

  function setWebcamOn(isOn: boolean) {

    if (isOn && isHost) {
      addHostToMeetingWithVideo();
    }

    dispatch(setCamOn(isOn));
  }

  function setMicOn(isMuted: boolean) {
    dispatch(setMuted(isMuted));
  }

  return (
    <div className="webcam webcam-container">
      <div className="webcam-video-container">
        {isWebcamOn || isScreenShared || isRemoteScreenSharing ? <WebcamOn /> : <WebcamOff />}
        <WebcamControls
          turnOn={() => setWebcamOn(!isWebcamOn)}
          micOn={() => setMicOn(!isMuted)}
        />
      </div>
    </div>
  );
};

export default WebcamVideo;
