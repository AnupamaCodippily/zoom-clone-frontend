import React, { ReactNode } from 'react'
import { IChatMessageComponent } from './ChatMessage'

interface IChatListComponent {
  messages?: ReactNode[]
}

const ChatList: React.FC<IChatListComponent> = ({ messages = [] }) => {
  return (
    <div className='chat-list'>
        {  messages }
    </div>
  )
}

export default ChatList