import React from 'react';
import { Box, keyframes,useTheme  } from '@mui/material';

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
  const theme = useTheme();
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
background: isUser
          ? theme.palette.primary.main
          : theme.palette.mode === 'dark'
            ? '#334155'  // Dark mode bubble
            : '#ffffff', // Light mode bubble
        color: isUser
          ? '#fff'
          : theme.palette.text.primary,
        boxShadow: !isUser
          ? theme.palette.mode === 'dark'
            ? '0 2px 12px rgba(0, 0, 0, 0.25)'
            : '0 2px 8px rgba(0, 0, 0, 0.1)'
          : 'none',
        borderBottomRightRadius: isUser ? '4px' : '18px',
        borderBottomLeftRadius: isUser ? '18px' : '4px',
        transition: theme.transitions.create(['background', 'box-shadow']),
            
      }}
    >
      {text}
    </Box>
  );
}

export default ChatMessage;