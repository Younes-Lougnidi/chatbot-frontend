import { useState,useContext } from 'react';
import { Box, CssBaseline ,useTheme } from '@mui/material';
import ChatWindow from './components/ChatWindow';
import ChatHeader from './components/ChatHeader';
import ChatInput from './components/ChatInput';
import { CustomThemeProvider } from './components/ThemeContext';


function App() {
const theme = useTheme();
  const [ChatMessages, setChatMessages] = useState([]);
  const handleAddmessagesUser = (Message) => {
    const id = Date.now()+"1"
    setChatMessages(prev => [...prev, { id:id ,sender: "user", message: Message }]);
  };
  const handleAddmessageBot = (Message) => {
    const id = Date.now()
    setChatMessages(prev => [...prev, { id:id ,sender: "bot", message: Message }]);
    return id;
  };
  const handleUpdateBotMessage = (id ,partialMessage)=>{
    setChatMessages(prev =>prev.map(msg =>{
      if(msg.id === id ){
        return{...msg , message :partialMessage};
      }
      return msg;
    }));
  };
  return (
    <CustomThemeProvider>
      <CssBaseline/>
      <Box
        className="main-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 700,
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'background.paper',
          minHeight: 300,
          position: 'relative',
          flex: 1,
          overflowY: 'auto',
          border: 0,
          borderRadius: { xs: '15px', sm: '15px', md: '25px' },
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          marginTop: { xs: '50px', sm: 0 },
          transition: 'all 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <ChatHeader />
        <ChatWindow messages={ChatMessages} />
        <ChatInput onAdduser={handleAddmessagesUser} onAddbot ={handleAddmessageBot} onUpdatebot = {handleUpdateBotMessage} />
      </Box>
    </CustomThemeProvider>
  );
}

export default App;