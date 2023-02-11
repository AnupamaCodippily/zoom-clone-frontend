import React, { useState } from 'react'
import WebcamVideo from '../../components/camera-share/WebcamVideo'
import RoomBottomPanel from '../../components/room-bottom-panel/bottom-panel'
import RoomSidePanel from '../../components/room-side-panel/RoomSidePanel'
import { api } from "../../state/queries/chatQueries";

interface RoomViewProps {
    children?:React.ReactElement<any, any>
}

const RoomView: React.FC<RoomViewProps> = ({children}) => {

  api.endpoints.getMessages.useQuery("blah");

  const [chatEnabled, setChatEnabled] = useState(false);

  function enableChat() {
    setChatEnabled(enabled => !enabled)
  }

  return (
    <div className='room-container'>
      <div className="flex-col flex-col-center full-screen-height room-cam-and-bottom-panel">
        <WebcamVideo/>
        <RoomBottomPanel chatEnabled={chatEnabled} toggleEnabledChat={enableChat}/>
      </div>
        { chatEnabled && <RoomSidePanel/>}
    </div>
  )
}

export default RoomView