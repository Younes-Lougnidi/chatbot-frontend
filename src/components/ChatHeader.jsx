import React from "react";
import Chatbot_avatar from "../assets/chatbot-avatar.png";
import "./ChatHeader.css";

function ChatHeader() {
  return (
    <div className="header">
      <img src={Chatbot_avatar} alt="Logo" />
      <div className="text-block">
        <h1>My Chatbot</h1>
        <p className="subtext">You can ask me anything</p>
      </div>
      <button className="options-button" aria-label="Options">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

    </div>
  );
}

export default ChatHeader;
