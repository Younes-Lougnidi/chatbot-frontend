import React, { useEffect, useRef } from "react";
import { Box, useTheme } from "@mui/material";
import ChatMessage from "./ChatMessage";

function ChatWindow({ messages }) {
  const theme = useTheme();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      className="chat-container"
      sx={{
        maxWidth: 700,
        width: "100%",
        margin: "0 auto",
        backgroundColor: theme.palette.background.paper,
        height: { xs: 300, sm: 450 },
        overflowY: "auto",
        padding: { xs: "8px", sm: "24px" },
        border: 0,
        transition: theme.transitions.create("background-color"),
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      ref={scrollRef}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          minHeight: "100%",
          gap: { xs: "12px", sm: "16px" },
          alignItems: "flex-end",
        }}
      >
        {messages.map((item, index) => (
          <ChatMessage key={index} sender={item.sender} text={item.message} />
        ))}
      </Box>
    </Box>
  );
}

export default ChatWindow;
