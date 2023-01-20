import React from 'react'
import WebcamVideo from '../../components/camera-share/WebcamVideo'
import RoomSidePanel from '../../components/room-side-panel/RoomSidePanel'

interface RoomViewProps {
    children?:React.ReactElement<any, any>
}

const RoomView: React.FC<RoomViewProps> = ({children}) => {
  return (
    <div className='room-container'>
        <WebcamVideo/>
        <RoomSidePanel/>
    </div>
  )
}

export default RoomView