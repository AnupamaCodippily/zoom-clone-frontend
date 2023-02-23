import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WebcamVideo from "../../components/camera-share/WebcamVideo";
import RoomBottomPanel from "../../components/room-bottom-panel/bottom-panel";
import RoomSidePanel from "../../components/room-side-panel/RoomSidePanel";
import RoomTopPanel from "../../components/room-top-panel/room-top-panel";
import { UserType } from "../../lib/constants/user-types";
import { api } from "../../state/queries/chatQueries";
import { RootState } from "../../state/store";

interface RoomViewProps {
  children?: React.ReactElement<any, any>;
}

const RoomView: React.FC<RoomViewProps> = ({ children }) => {
  api.endpoints.getMessages.useQuery("blah");

  const [chatEnabled, setChatEnabled] = useState(false);

  const roomName = useSelector((state: RootState) => state.auth.roomName);
  const meetingTitle = useSelector(
    (state: RootState) => state.auth.meetingTitle
  );
  const userType = useSelector((state: RootState) => state.auth.userType);

  function enableChat() {
    setChatEnabled((enabled) => !enabled);
  }

  useEffect(() => {
    if (userType === UserType.ADMIN) {
      api.endpoints.startMeeting.initiate({
        title: meetingTitle,
        meetingId: roomName,
      });
    }

    if (userType === UserType.STUDENT) {
      api.endpoints.studentJoinMeeting.initiate({
        meetingId: roomName,
      });
    }
  }, []);

  return (
    <div className="room-container">
      <RoomTopPanel />
      <div className="flex-col flex-col-center full-screen-height room-cam-and-bottom-panel">
        <WebcamVideo />
        <RoomBottomPanel
          chatEnabled={chatEnabled}
          toggleEnabledChat={enableChat}
        />
      </div>
      <AnimatePresence>{chatEnabled && <RoomSidePanel />}</AnimatePresence>
    </div>
  );
};

export default RoomView;
