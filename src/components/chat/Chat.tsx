import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Chatbox from "./Chatbox";
import ChatList from "./ChatList";
import chatIcon1 from '../../assets/icons/chat-icon-1.png'

const Chat = () => {

  const messagesList = useSelector(
    (state: RootState) => state.chat.chatMessages
  );

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-heading">Chat</div>
        <div className="chat-messagecount">
          <img className="chat-icon" src={chatIcon1} alt="chat-icon"/>
          <b> {messagesList.length}</b>
        </div>
      </div>
      <ChatList />
      <Chatbox />
    </div>
  );
};

export default Chat;
