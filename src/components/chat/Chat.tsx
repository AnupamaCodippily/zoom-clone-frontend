import React from "react";
import Chatbox from "./Chatbox";
import ChatList from "./ChatList";

const Chat = () => {
  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-heading">Chat</div>
        <div className="chat-headcount">
          <img className="chat-icon" src="" alt="chat-icon"/>
          <b> 123</b>
        </div>
      </div>
      <ChatList />
      <Chatbox />
    </div>
  );
};

export default Chat;
