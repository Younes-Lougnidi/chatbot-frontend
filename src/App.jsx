import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import ChatHeader from './components/ChatHeader'
import ChatInput from './components/ChatInput'


function App() {
  const [ChatMessages,setChatMessages] = useState([]);
  const handleAddmessages = (chatSender,chatMessage)=>{
    setChatMessages([...ChatMessages,{sender:chatSender,message:chatMessage}])
  }
  return (
    <div className='main-container'>
    <ChatHeader />
    <ChatWindow messages={ChatMessages} />
    <ChatInput onAdd={handleAddmessages}/>
    </div>
  )
}

export default App
