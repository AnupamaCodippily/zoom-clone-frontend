import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { api } from '../../state/queries/chatQueries'
import { IChatMessageComponent } from './ChatMessage'

interface IChatListComponent {
  messages?: ReactNode[]
}

const ChatList: React.FC<IChatListComponent> = ({ messages = [] }) => {

  const dispatch = useDispatch();
  const x = api.endpoints.getMessages.useQuery('blah');
  useEffect(() => {
  console.log(x)
  }, [x]);

  return (
    <div className='chat-list'>
        {  messages }
    </div>
  )
}

export default ChatList