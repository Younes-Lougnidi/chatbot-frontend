import { useState,useContext } from 'react';
import Chatbot_avatar from "../assets/chatbot-avatar.png";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { ThemeContext } from './ThemeContext';
import OptionForm from './OptionForm';

function ChatHeader() {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { mode, toggleTheme } = useContext(ThemeContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: { xs: "12px 16px", sm: "16px 20px", md: "20px 24px" },
        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
        borderRadius: { xs: "20px 20px 0 0", md: "25px 25px 0 0" },
        color: "white",
        maxWidth: 700,
        width: "100%",
        margin: "0 auto",
        boxShadow: "0 4px 20px rgba(239, 68, 68, 0.3)",
        gap:2,
      }}
    >
      <Avatar
        src={Chatbot_avatar}
        alt="Logo"
        sx={{
          width: 40,
          height: 40,
          marginRight: "10px",
          backgroundColor: "white",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          flex: 1,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "18px", sm: "20px", md: "28px" },
            fontWeight: 600,
            margin: 0,
          }}
        >
          My Chatbot
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "13px", sm: "14px", md: "20px" },
            opacity: 0.8,
            margin: 0,
          }}
        >
          You can ask me anything
        </Typography>
      </Box>

      <IconButton
        aria-label="Options"
        onClick={() => setOptionsOpen(true)}

        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          color: "white",
          width: 40,
          height: 40,
          backdropFilter: "blur(10px)",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <MoreVert />
      </IconButton>
      <OptionForm 
        open={optionsOpen}
        onClose={() => setOptionsOpen(false)}
        isDarkMode={mode === 'dark'}
        toggleTheme={toggleTheme}
      />
    </Box>
  );
}

export default ChatHeader;
