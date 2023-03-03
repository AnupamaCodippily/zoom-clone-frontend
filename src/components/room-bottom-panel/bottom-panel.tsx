import React from "react";
import { useDispatch } from "react-redux";
import { setAsHost } from "../../state/slices/room";
interface RoomBottomPanelProps {
  toggleEnabledChat: () => void;
  chatEnabled: boolean;
}

const RoomBottomPanel: React.FC<RoomBottomPanelProps> = ({
  toggleEnabledChat,
  chatEnabled,
}) => {
  const dispatch = useDispatch();

  const copyInviteToClipboard = () => {
    dispatch(setAsHost(true));
  };

  return (
    <div className="room-bottom-panel">
      <button
        className={
          "room-bottom-panel-action" +
          (chatEnabled ? " active-room-bottom-control" : "")
        }
        onClick={() => toggleEnabledChat()}
      >
        Chat
      </button>
      <button
        className="room-bottom-panel-action room-bottom-invite-button"
        onClick={copyInviteToClipboard}
      >
        Invite
      </button>
    </div>
  );
};

export default RoomBottomPanel;
