import { useState } from "react";
import { Box, TextField, IconButton, Paper, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress, useMediaQuery } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";

function ChatInput({ onUpdatebot, onAdduser, onAddbot }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const isSendEnabled = inputValue.trim().length > 0;
  const [controller, setController] = useState(null);
  const sessionId = "user123";

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && isSendEnabled) {
      event.preventDefault();
      handleSendClick();
    }
  };

  async function handleSendClick() {
    if (!isSendEnabled || loading) return;
    const userText = inputValue;
    setInputValue("");
    onAdduser(inputValue);
    setLoading(true);
    const abortController = new AbortController();
    setController(abortController);

    let dots = 'Bot is typing';
    const dot_id = onAddbot("Bot is typing");
    let dotInterval = setInterval(()=>{
      dots = dots.length < 16 ? dots + "." :"Bot is typing";
      onUpdatebot(dot_id,dots);
    },500)
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ text: userText, session_id: sessionId }),
        signal: abortController.signal,
      });
      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let botReply = "";

      // Add empty bot message and get its id:
      clearInterval(dotInterval);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          botReply += chunk;
          onUpdatebot(dot_id, botReply);
        }
      }
    } catch (err) {
      clearInterval(dotInterval)
      if (err.name === "AbortError") {
        console.log("Fetch aborted by user (stop button).");
        return; // don't show error in chat
      }
      console.error(err);
      onAddbot("⚠️ Error: could not connect to the server");
    } finally {
      setLoading(false);
    }
  }
  async function handleStopClick() {
    if (controller) controller.abort();
    await fetch("http://127.0.0.1:5000/stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionId }),
    });
    setLoading(false);
  }
  return (
    <Box
      sx={{
        position: "relative",
        background: theme.palette.background.paper,
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
        width: "100%",
        maxWidth: 700,
        margin: "0 auto",
        padding: { xs: "0 8px", sm: "0 12px" },
        border: 0,
        transition: theme.transitions.create("background"),
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: "6px", sm: "12px" },
          padding: { xs: "8px 10px", sm: "16px 20px" },
          background: theme.palette.background.paper,
          borderRadius: "25px",
          margin: { xs: "8px 0", sm: "16px" },
          border: `2px solid ${
            theme.palette.mode === "dark" ? "#334155" : "#e2e8f0"
          }`,
          transition: theme.transitions.create(["border-color", "box-shadow"]),
          "&:focus-within": {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 3px ${theme.palette.primary.light}40`,
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <TextField
            variant="standard"
            placeholder="Type and press [enter]"
            multiline
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            disabled={loading}
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                width: "100%",
                overflowY: "auto",
                border: "none",
                outline: "none",
                fontSize: { xs: "14px", sm: "16px" },
                color: theme.palette.text.primary,
                background: "transparent",
                minHeight: "24px",
                maxHeight: "120px",
                alignItems: "flex-start",
                justifyContent: "center",
                lineHeight: 1.5,
                fontFamily: "inherit",
                padding: 0,
                "&:before, &:after": {
                  display: "none",
                },
                "& textarea": {
                  padding: "0 !important",
                  resize: "none",
                  overflow: "hidden",
                  "&::placeholder": {
                    color: theme.palette.text.secondary,
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
              background: theme.palette.primary.main,
              color: "white",
              opacity: isSendEnabled || loading ? 1 : 0.5,
              cursor: isSendEnabled || loading ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
              "&:hover": {
                background: theme.palette.primary.dark,
                transform: isSendEnabled || loading ? "scale(1.05)" : "none",
              },
              "& svg": {
                width: { xs: "16px", sm: "20px" },
                height: { xs: "16px", sm: "20px" },
              },
            }}
            onClick={loading ? handleStopClick : handleSendClick}
          >
            {loading ? <StopIcon /> : <SendIcon />}
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default ChatInput;
