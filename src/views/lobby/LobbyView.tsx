import React from "react";

const LobbyView = () => {
  return (
    <div className="lobby-view">
      <div className="lobby-view-center-panel">
        <div>
          <h3>Enter classroom code</h3>
        </div>
        <div>
          <form>
            <input type="text" />
            <br />
            <br />
            <br />
            <input type="submit" value='JOIN'/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LobbyView;
