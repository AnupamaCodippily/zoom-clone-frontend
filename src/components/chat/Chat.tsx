import React from 'react'
import Chatbox from './Chatbox'
import ChatList from './ChatList'

const Chat = () => {
  return (
    <div className='chat-panel'>
        <ChatList/>
        <Chatbox/>
    </div>
  )
}

export default Chat