import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import WebcamControls from './webcam-controls/WebcamControls';
import WebcamOff from './WebcamOff';
import WebcamOn from './WebcamOn';
import {setCamOn, setLocalDisplayStream, setMuted} from '../../state/slices/room'


const WebcamVideo: React.FC = () => {

  const isWebcamOn = useSelector((state: RootState) => state.room.isCamOn )
  const isMuted = useSelector((state: RootState) => state.room.isMuted )
  const isScreenShared = useSelector((state: RootState) => state.room.isScreenShared )

  const dispatch = useDispatch();

  function setWebcamOn(isOn: boolean) {
    dispatch(setCamOn(isOn))
  }

  function setMicOn(isMuted: boolean) {
    dispatch(setMuted(isMuted))
  }

  return (
    <div className='webcam webcam-container'>
        {
            (isWebcamOn || isScreenShared) ? <WebcamOn/> : <WebcamOff/>
        }
        <WebcamControls turnOn={() => setWebcamOn(!isWebcamOn)} micOn={() => setMicOn(!isMuted)} />
    </div>
  )
}

export default WebcamVideo