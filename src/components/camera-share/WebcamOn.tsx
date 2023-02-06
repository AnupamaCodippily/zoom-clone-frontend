import { useEffect, useRef } from "react";
import { useSelector, useStore } from "react-redux";
import { RootState } from "../../state/store";

const WebcamOn = () => {
  const isSelfMuted = useSelector((state: RootState) => state.room.isMuted);
  const isMainPresenter = useSelector(
    (state: RootState) => state.room.isMainPresenter
  );
  // const localStreamSrc = useSelector((state: RootState) => state.room.)

  const localStreamSrc = useSelector(
    (state: RootState) => state.room.selfCameraStream
  );

  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef?.current) videoRef.current.srcObject = localStreamSrc;
  }, []);

  return (
      <video
        ref={videoRef}
        muted={isSelfMuted}
        autoPlay
        playsInline
        className={"webcam-on" + (isMainPresenter ? " webcam-main" : "")}
      />
  );
};

export default WebcamOn;
