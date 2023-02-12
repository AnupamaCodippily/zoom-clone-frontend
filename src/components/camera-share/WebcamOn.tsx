import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
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
    if (videoRef?.current) {
      videoRef.current.srcObject = localStreamSrc;
      videoRef.current.play();
    }
  }, [localStreamSrc]);

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
