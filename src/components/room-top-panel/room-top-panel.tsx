import React from "react";

const RoomTopPanel = () => {
  const title = "test";

  return (
    <div className="room-top-panel">
      <div>Title : {title}</div>
      <div></div>
      <div className="date-time-indicator">
        {Date.now()} | {Date.now()}
      </div>
    </div>
  );
};

export default RoomTopPanel;
