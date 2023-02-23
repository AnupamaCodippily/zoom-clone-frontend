import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

function getDate() {
  const date = new Date(Date.now());

  return (
    date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
  );
}

const RoomTopPanel = () => {
  const title = useSelector<RootState, string>(
    (state: RootState) => state.auth.roomName
  );

  return (
    <div className="room-top-panel">
      <div className="room-title">Title : {title}</div>
      <div className="date-time-indicator">{getDate()}</div>
    </div>
  );
};

export default RoomTopPanel;
