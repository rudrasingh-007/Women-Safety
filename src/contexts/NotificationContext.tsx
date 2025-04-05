// src/contexts/NotificationContext.tsx
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';

// Transition component
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />; // Example: slide from left
}

interface NotificationState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface NotificationContextType {
  showNotification: (message: string, severity?: AlertColor) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationState | null>(null);

  // Prefix 'event' with an underscore to signal it's intentionally unused
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(null); // Setting state to null closes the Snackbar
  };

  // Use useCallback to prevent unnecessary re-creation of the function
  const showNotification = useCallback((message: string, severity: AlertColor = 'success') => {
    setNotification({ open: true, message, severity });
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {/* Render Snackbar globally here based on state */}
      <Snackbar
         // Use !!notification to convert null/object to boolean for 'open' prop
        open={!!notification}
        autoHideDuration={5000}
        onClose={handleClose}
        // Match source project position (top-right)
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={SlideTransition} // Use custom transition
      >
        {/* Need Alert inside for structure and severity. Check if notification exists before accessing properties */}
        {/* Using a MuiAlert component inside Snackbar requires a check like this */}
        {notification ? (
             <Alert
                onClose={handleClose} // Add close button to alert itself
                severity={notification.severity}
                variant="filled" // Use filled variant for better visibility
                sx={{ width: '100%', boxShadow: 6 }} // Add shadow
              >
                {notification.message}
              </Alert>
         ) : undefined /* Render nothing if notification is null. Important for type safety with Alert */}
      </Snackbar>
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context easily
export const useNotifier = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifier must be used within a NotificationProvider');
  }
  return context;
};