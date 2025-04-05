// src/pages/AlertsPage.tsx
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Paper, Chip, Box, CircularProgress, Alert as MuiAlert } from '@mui/material'; // Renamed Alert to MuiAlert to avoid conflict
import { fetchAlerts } from '../services/api'; // Import the API function
import { SafetyAlert } from '../types';

const getSeverityColor = (severity: SafetyAlert['severity']): 'error' | 'warning' | 'info' => {
    switch (severity) {
        case 'High': return 'error';
        case 'Medium': return 'warning';
        case 'Low': return 'info';
        default: return 'info';
    }
};

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAlerts();
        setAlerts(data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    loadAlerts();
  }, []); // Empty dependency array means this runs once on mount

  // Conditional Rendering
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
        <Box display="flex" justifyContent="center" p={3}>
            <MuiAlert severity="error" sx={{ width: '100%', maxWidth: '600px' }}>{error}</MuiAlert>
        </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: { xs: 1, sm: 2, md: 3 } }}> {/* Responsive padding */}
      <Typography variant="h4" component="h1" gutterBottom>
        Safety Alerts
      </Typography>
      {alerts.length === 0 ? (
         <Typography sx={{mt: 2}}>No current alerts.</Typography>
      ) : (
        <List>
          {alerts.map((alert, index) => (
            <React.Fragment key={alert.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}>
                      {alert.location}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {alert.description}
                      </Typography>
                      {new Date(alert.timestamp).toLocaleString()}
                    </>
                  }
                />
                <Chip
                  label={alert.severity}
                  color={getSeverityColor(alert.severity)}
                  size="small"
                  sx={{ ml: 2, alignSelf: 'center' }}
                />
              </ListItem>
              {index < alerts.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default AlertsPage;