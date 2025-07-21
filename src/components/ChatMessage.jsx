import React from 'react'
import './ChatMessage.css'

function ChatMessage({sender,text}) {
    if (sender == "user"){
        return <div className='message-bubble user'>{text}</div>
    }
    else{
        return <div className='message-bubble bot'>{text}</div>
    }
}

export default ChatMessage