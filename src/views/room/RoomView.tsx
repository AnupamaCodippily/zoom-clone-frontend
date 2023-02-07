import React from 'react'
import WebcamVideo from '../../components/camera-share/WebcamVideo'
import RoomBottomPanel from '../../components/room-bottom-panel/bottom-panel'
import RoomSidePanel from '../../components/room-side-panel/RoomSidePanel'

interface RoomViewProps {
    children?:React.ReactElement<any, any>
}

const RoomView: React.FC<RoomViewProps> = ({children}) => {
  return (
    <div className='room-container'>
      <div className="flex-col flex-col-center full-screen-height room-cam-and-bottom-panel">
        <WebcamVideo/>
        <RoomBottomPanel/>
      </div>
        <RoomSidePanel/>
    </div>
  )
}

export default RoomView