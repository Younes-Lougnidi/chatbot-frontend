
import "./ChatInput.css"
import { useState } from "react";

function ChatInput({onAdd}) {
  const [sender,setSender] = useState('');
  const [inputValue, setinputValue] = useState('');
  const isSendEnabled =
  (sender === 'user' || sender === 'bot') && inputValue.trim().length > 0;

  const handleInputchange2= (event) =>{
    setinputValue(event.target.value);
    event.target.style.height= 'auto';
    event.target.style.height= Math.min(event.target.scrollHeight, 120) + 'px';
  }
    const handleInputchange1= (event) =>{
    setSender(event.target.value);
  }

  const handleKeyPress = (event) =>{
    if (event.key === 'Enter' && isSendEnabled){
      event.preventDefault();
      handleSendClick();
    }
  }
  const handleSendClick = () => {
    onAdd(sender,inputValue);
    setinputValue('');
    setSender('');
  };




  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <textarea
          className="chat-input N1"
          placeholder="Sender"
          rows="1"
          value={sender}
          onChange={handleInputchange1}
          onKeyDown={handleKeyPress}
          
          
        ></textarea>
          <textarea
          className="chat-input N2"
          placeholder="Type and press [enter]"
          rows="1"
          value={inputValue}
          onChange={handleInputchange2}
          onKeyDown={handleKeyPress}
          
          
        ></textarea>
        <div className="input-actions">
          <button className={`action-btn send-btn ${isSendEnabled ? 'enabled' : ''}`} id="sendBtn" title="Send message" onClick={handleSendClick}
          disabled={!isSendEnabled}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
