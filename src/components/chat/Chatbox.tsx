import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import sendIcon from "../../assets/icons/send-msg-icon.png";
import { store } from "../../state/store";
import { api } from "../../state/queries/chatQueries";

const Chatbox: React.FC = () => {
  const username = store.getState().room.username;
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  function handleCreateMessage(event: FormEvent) {
    event.preventDefault();

    dispatch(api.endpoints.sendMessage.initiate({ username, body: message }));
    setMessage((_) => "");
  }

  return (
    <div className="chat-box-outer">
      <div className="chat-box">
        <form onSubmit={(e) => handleCreateMessage(e)}>
          <div className="chatbox-input-container">
            <input
              type="text"
              className="chatbox-input"
              value={message}
              onChange={(e) => setMessage((_) => e.target.value)}
              placeholder="Type your message"
            />
            <button>
              <img src={sendIcon} alt="send message" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
