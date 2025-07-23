import React from 'react';
import { Box, keyframes } from '@mui/material';

// Define the slideIn animation
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

function ChatMessage({ sender, text }) {
  const isUser = sender === "user";

  return (
    <Box
      sx={{
        maxWidth: { xs: "90%", sm: "80%" },
        padding: "12px 16px",
        borderRadius: "18px",
        fontSize: { xs: "13px", sm: "14px" },
        lineHeight: 1.4,
        animation: `${slideIn} 0.3s ease`,
        alignSelf: isUser ? "flex-end" : "flex-start",
        ...(isUser
          ? {
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              borderBottomRightRadius: "4px",
            }
          : {
              background: "white",
              color: "#333",
              borderBottomLeftRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }),
      }}
    >
      {text}
    </Box>
  );
}

export default ChatMessage;