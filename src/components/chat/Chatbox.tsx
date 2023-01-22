import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { api } from '../../state/queries/chatQueries'

const Chatbox :React.FC = () => {

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  function handleCreateMessage(event: FormEvent) {

    event.preventDefault();

    const result = dispatch(api.endpoints.sendMessage.initiate(message))
    console.log(message)

    console.log(api.endpoints)
    setMessage(_ => "")
  }

  return (
    <div className='chat-box'>
        <form onSubmit={(e) => handleCreateMessage(e)}>
            <input type='text' className='chatbox-input' value={message} onChange={(e) => setMessage(_ => e.target.value)}/>
            <input type='submit' />
        </form>
    </div>
  )
}

export default Chatbox