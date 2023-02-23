import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export interface IChatMessageComponent {
    chatMessage: string;
    senderName: string;
}

const ChatMessage: React.FC<IChatMessageComponent> = ({ senderName, chatMessage }) => {

  const username = useSelector((state: RootState) => state.auth.username)

  return (
    <div className={`chat-message from-${senderName === username ? 'me' : 'other'}`}>
      <span className='sender-name'>{senderName}</span>
      <div>
        {chatMessage}
      </div>
    </div>
  )
}

export default ChatMessage