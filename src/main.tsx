// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material'; // <-- Re-import ThemeProvider
import theme from './styles/theme'; // <-- Re-import the static theme
import { AuthProvider } from './contexts/AuthContext.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';
// import { ColorModeProvider } from './contexts/ColorModeContext.tsx'; // <-- Remove ColorModeProvider import
import './styles/animations.css';
import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Use the standard ThemeProvider with the static theme */}
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Keep CssBaseline inside */}
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);