import React from 'react';
import { Box } from '@mui/material';
import ChatMessage from './ChatMessage';

function ChatWindow({ messages }) {
  return (
    <Box
      className="chat-container"
      sx={{
        maxWidth: 700,
        width: "100%",
        margin: "0 auto",
        backgroundColor: "white",
        minHeight: 300,
        position: "relative",
        flex: 1,
        overflowY: "auto",
        border: 0,
      }}
    >
      <Box
        className="chat-content"
        sx={{
          padding: { xs: "8px", sm: "24px" },
          color: "#666",
          textAlign: "center",
          fontSize: { xs: "13px", sm: "16px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          height: { xs: 300, sm: 450 },
          flexDirection: "column",
          gap: { xs: "12px", sm: "16px" },
        }}
      >
        {messages.map((item, index) => (
          <ChatMessage 
            key={index} 
            sender={item.sender} 
            text={item.message} 
          />
        ))}
      </Box>
    </Box>
  );
}

export default ChatWindow;