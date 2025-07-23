import { useState } from "react";
import { Box, TextField, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatInput({ onAdd }) {
  const [sender, setSender] = useState("");
  const [inputValue, setInputValue] = useState("");
  const isSendEnabled =
    (sender === "user" || sender === "bot") && inputValue.trim().length > 0;

  const handleInputChange2 = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputChange1 = (event) => {
    setSender(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && isSendEnabled) {
      event.preventDefault();
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    onAdd(sender, inputValue);
    setInputValue("");
    setSender("");
  };

  return (
    <Box
      sx={{
        position: "relative",
        background: "white",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
        width: "100%",
        maxWidth: 700,
        margin: "0 auto",
        padding: { xs: "0 8px", sm: "0 12px" },
        border: 0,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: "6px", sm: "12px" },
          padding: { xs: "8px 10px", sm: "16px 20px" },
          background: "white",
          borderRadius: "25px",
          margin: { xs: "8px 0", sm: "16px" },
          border: "2px solid #e8e8e8",
          transition: "all 0.2s ease",
          "&:focus-within": {
            borderColor: "#ef4444",
            boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
          },
        }}
      >
        <TextField
          variant="standard"
          placeholder="Sender"
          value={sender}
          onChange={handleInputChange1}
          onKeyDown={handleKeyPress}
          InputProps={{
            disableUnderline: true,
            sx: {
              border: "2px solid #e8e8e8",
              borderRadius: "25px",
              minHeight: { xs: "32px", sm: "35px" },
              width: { xs: "80px", sm: "100px" },
              textAlign: "center",
              padding: "3px 8px",
              fontSize: { xs: "13px", sm: "16px" },
              "& input": {
                textAlign: "center",
                padding: 0,
              },
            },
          }}
        />

        
        <Box sx={{ 
          flex: 1, 
          minWidth: 0,
        }}>
          <TextField
            variant="standard"
            placeholder="Type and press [enter]"
            multiline
            fullWidth
            value={inputValue}
            onChange={handleInputChange2}
            onKeyDown={handleKeyPress}
            sx={{
              width: '100%',
              '& .MuiInputBase-root': {
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: { xs: "14px", sm: "16px" },
                color: "#333",
                background: "transparent",
                minHeight: "24px",
                maxHeight: "120px",
                alignItems:"flex-start",
                lineHeight: 1.5,
                fontFamily: "inherit",
                padding: 0,
                '&:before, &:after': {
                  display: 'none'
                },
                '& textarea': {
                  padding: '0 !important',
                  resize : 'none',
                  overflow:"hidden",
                  '&::placeholder': {
                    color: "#999",
                    opacity: 1,
                  },
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            sx={{
              width: { xs: "30px", sm: "36px" },
              height: { xs: "30px", sm: "36px" },
              background: "#ef4444",
              color: "white",
              opacity: isSendEnabled ? 1 : 0.5,
              cursor: isSendEnabled ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "#dc2626",
                transform: isSendEnabled ? "scale(1.05)" : "none",
              },
              "& svg": {
                width: { xs: "16px", sm: "20px" },
                height: { xs: "16px", sm: "20px" },
              },
            }}
            onClick={handleSendClick}
            disabled={!isSendEnabled}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default ChatInput;