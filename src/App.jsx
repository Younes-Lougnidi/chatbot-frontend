import { useState } from 'react';
import { Box, GlobalStyles } from '@mui/material';
import ChatWindow from './components/ChatWindow';
import ChatHeader from './components/ChatHeader';
import ChatInput from './components/ChatInput';

// Global styles to replace your CSS reset and body styles
const globalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      body: {
        fontFamily: '"Poppins", sans-serif',
        background: '#f5f5f5',
        padding: '20px',
        overflowX: 'hidden',
      },
    }}
  />
);

function App() {
  const [ChatMessages, setChatMessages] = useState([]);
  
  const handleAddmessages = (chatSender, chatMessage) => {
    setChatMessages([...ChatMessages, { sender: chatSender, message: chatMessage }]);
  };

  return (
    <>
      {globalStyles}
      <Box
        className="main-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 700,
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'white',
          minHeight: 300,
          position: 'relative',
          flex: 1,
          overflowY: 'auto',
          border: 0,
          borderRadius: { xs: '15px', sm: '15px', md: '25px' },
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          marginTop: { xs: '50px', sm: 0 },
        }}
      >
        <ChatHeader />
        <ChatWindow messages={ChatMessages} />
        <ChatInput onAdd={handleAddmessages} />
      </Box>
    </>
  );
}

export default App;