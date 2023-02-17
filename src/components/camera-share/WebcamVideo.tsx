import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import WebcamControls from "./webcam-controls/WebcamControls";
import WebcamOff from "./WebcamOff";
import WebcamOn from "./WebcamOn";

const WebcamVideo: React.FC = () => {
  const isWebcamOn = useSelector((state: RootState) => state.room.isCamOn);
  const isRemoteScreenSharing = useSelector(
    (state: RootState) => state.room.displayingRemoteStream
  );
  const isScreenShared = useSelector(
    (state: RootState) => state.room.isScreenShared
  );

  return (
    <div className="webcam webcam-container">
      <div className="webcam-video-container">
        {isWebcamOn || isScreenShared || isRemoteScreenSharing ? (
          <WebcamOn />
        ) : (
          <WebcamOff />
        )}
        <WebcamControls />
      </div>
    </div>
  );
};

export default WebcamVideo;
