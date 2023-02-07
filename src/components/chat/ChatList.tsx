import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { api } from "../../state/queries/chatQueries";
import { RootState } from "../../state/store";
import IChatMessage from "../../types/Message";
import ChatMessage, { IChatMessageComponent } from "./ChatMessage";

interface IChatListComponent {
  messages?: ReactNode[];
}

const ChatList: React.FC<IChatListComponent> = ({ messages = [] }) => {
  api.endpoints.getMessages.useQuery("blah");

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
