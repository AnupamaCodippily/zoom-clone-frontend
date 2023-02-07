import React from "react";
interface RoomBottomPanelProps {
  toggleEnabledChat: () => void;
  chatEnabled: boolean;
}

const RoomBottomPanel: React.FC<RoomBottomPanelProps> = ({
  toggleEnabledChat,
  chatEnabled,
}) => {

    

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
      <button className="room-bottom-panel-action room-bottom-invite-button">Invite</button>
    </div>
  );
};

export default RoomBottomPanel;
