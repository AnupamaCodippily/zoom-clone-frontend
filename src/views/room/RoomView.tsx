import React from 'react'
import WebcamVideo from '../../components/camera-share/WebcamVideo'

interface RoomViewProps {
    children?:React.ReactElement<any, any>
}

const RoomView: React.FC<RoomViewProps> = ({children}) => {
  return (
    <div className='room-container'>
        <WebcamVideo/>
    </div>
  )
}

export default RoomView