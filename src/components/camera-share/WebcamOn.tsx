import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getLocalMediaStreamObject } from "../../lib/webrtc/setup-media-sources";
import { RootState } from "../../state/store";

const WebcamOn = () => {
  const isSelfMuted = useSelector((state: RootState) => state.room.isMicOn);
  const isScreenShared = useSelector((state: RootState) => state.room.isScreenShared);
  const isCamOn = useSelector((state: RootState) => state.room.isCamOn);
  const isMainPresenter = useSelector(
    (state: RootState) => state.room.isMainPresenter
  );
  const localStreamSrc = useSelector(
    (state: RootState) => state.room.playingMediaStream
  );

  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.srcObject = getLocalMediaStreamObject();
      videoRef.current.play();
    }
  }, [localStreamSrc, isSelfMuted, isCamOn, isScreenShared ]);

  return (
    <video
      ref={videoRef}
      muted={isSelfMuted}
      autoPlay={true}
      playsInline={true}
      className={"webcam-on" + (isMainPresenter ? " webcam-main" : "")}
    />
  );
};

export default WebcamOn;
