import React from 'react'

export interface IChatMessageComponent {
    chatMessage: string;
    senderName: string;
}

const ChatMessage: React.FC<IChatMessageComponent> = ({ senderName, chatMessage }) => {
  return (
    <div>
      <span>{senderName}</span>
      <div>
        {chatMessage}
      </div>
    </div>
  )
}

export default ChatMessage