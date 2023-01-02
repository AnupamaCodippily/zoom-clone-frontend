import React from 'react'
import { useSelector } from 'react-redux'
import { getLocalStream } from '../../../lib/webrtc/setup-media-sources'
import { setLocalCam } from '../../../state/slices/room'
import { RootState, store } from '../../../state/store'

interface WebcamControlsProps {
  turnOn: () => void,
  micOn: () => void,
}

const WebcamControls : React.FC<WebcamControlsProps> = ({ turnOn, micOn }) => {

  const isMuted = useSelector((state: RootState) => state.room.isMuted)
  const enableCam = useSelector((state: RootState) => state.room.isCamOn)


  async function handleClickWebcamButton () {
    if (!enableCam) {
      const localStreamSrc = await getLocalStream();
      store.dispatch(setLocalCam(localStreamSrc))
    } else {
      store.dispatch(setLocalCam(null))
    }

    turnOn();
  }

  return (
    <div className='webcam-controls'>
      <div className='controls-inner'>
        <button className={'turn-on-video' + ( enableCam ? " active-webcam-control" : " inactive-webcam-control" )} onClick={handleClickWebcamButton}>
            Video
        </button>
        <button className={'turn-on-video' + ( isMuted ? " active-webcam-control" : " inactive-webcam-control" )} onClick={() => micOn()}>
            Mic
        </button>
      </div>
    </div>
  )
}

export default WebcamControls