import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import IChatMessage from "../../types/Message";
import ChatMessage from "./ChatMessage";

interface IChatListComponent {
  messages?: ReactNode[];
}

const ChatList: React.FC<IChatListComponent> = ({ messages = [] }) => {

  const messagesList = useSelector(
    (state: RootState) => state.chat.chatMessages
  );

  return (
    <div className="chat-list">
      {messagesList.map((m: IChatMessage) => (
        <ChatMessage chatMessage={m.body} senderName={m.username} />
      ))}
    </div>
  );
};

export default ChatList;
