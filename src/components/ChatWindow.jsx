import React from 'react'
import ChatMessage from './ChatMessage'
import './ChatWindow.css'


function ChatWindow({messages}) {
  return (
    <div className='chat-container'>
        <div className='chat-content'>
          {messages.map((item)=>{
            return <ChatMessage sender={item.sender} text={item.message} />
          })}
        </div>
    </div>
  )
}

export default ChatWindow