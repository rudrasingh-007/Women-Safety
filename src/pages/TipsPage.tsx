// src/pages/TipsPage.tsx
import React, { useState, useEffect } from 'react';
import {
    Typography, Accordion, AccordionSummary, AccordionDetails, Box,
    CircularProgress, Alert as MuiAlert // MUI components seem correctly imported
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Icon is imported
import { fetchTips } from '../services/api'; // Assuming fetchTips is correctly implemented
import { SafetyTip } from '../types'; // Assuming SafetyTip type is correctly defined

const TipsPage: React.FC = () => {
  // State variables setup seems correct
  const [tips, setTips] = useState<SafetyTip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect hook for data fetching on mount seems correct
  useEffect(() => {
    const loadTips = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTips(); // Call the API function
        // Assuming 'data' matches SafetyTip[] type
        setTips(data);
      } catch (err: any) {
        // Error handling seems correct
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        // Ensures loading is set to false regardless of success/failure
        setLoading(false);
      }
    };

    loadTips();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Conditional Rendering ---

  // Loading state display seems correct
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  // Error state display seems correct
  if (error) {
     return (
        <Box display="flex" justifyContent="center" p={3}>
            <MuiAlert severity="error" sx={{ width: '100%', maxWidth: '600px' }}>{error}</MuiAlert>
        </Box>
    );
  }

  // --- Main Content Rendering ---
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Safety Tips
      </Typography>
      {/* Conditional rendering for empty tips array seems correct */}
      {tips.length === 0 ? (
         <Typography sx={{mt: 2}}>No tips available right now.</Typography>
      ) : (
        // Mapping over tips array seems correct
        tips.map((tip) => (
            // Using tip.id as key is correct
            <Accordion key={tip.id} elevation={1} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${tip.id}-content`}
                id={`panel-${tip.id}-header`}
              >
                {/* Accessing tip properties assumes 'tip' matches SafetyTip structure */}
                <Typography sx={{ width: { xs: '50%', sm: '33%' }, flexShrink: 0, fontWeight: 500 }}>
                  {tip.category}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{tip.title}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: 'background.default' }}>
                <Typography>
                  {tip.details}
                </Typography>
              </AccordionDetails>
            </Accordion>
        ))
      )}
    </Box>
  );
};

export default TipsPage;