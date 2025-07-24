import { createContext, useState, useMemo } from 'react';
import { createTheme,ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#ef4444', // Your brand red
        contrastText: '#fff',
      },
      ...(mode === 'dark' ? {
        // Dark mode overrides
        background: {
          default: '#0f172a',    
          paper: '#1e293b',      
        },
        text: {
          primary: '#f8fafc',   
          secondary: '#94a3b8',  
        },
      } : {
        // Light mode defaults
        background: {
          default: 'white',    
          paper: '#ffffff',
        },
      }),
    },
    shape: {
      borderRadius: 12, 
    },
    transitions: {
      duration: {
        enteringScreen: 300, 
      },
    },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Poppins", sans-serif',
          padding: '20px',
          overflowX: 'hidden',
          backgroundColor: mode === 'dark' ? '#0f172a' : 'white',
          transition: 'background-color 0.3s ease',
        },
      },
    },
  },
}), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider  theme={theme}>
        {children}
      </MuiThemeProvider >
    </ThemeContext.Provider>
  );
};