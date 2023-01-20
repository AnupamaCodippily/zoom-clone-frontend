import React from 'react'

const Chatbox :React.FC = () => {
  return (
    <div className='chat-box'>
        <form>
            <input type='text' className='chatbox-input'/>
            <input type='submit' />
        </form>

    </div>
  )
}

export default Chatbox