// Inside a component like src/pages/SomePage.tsx
import React from 'react';
import { Box, Paper } from '@mui/material';

const SomePage: React.FC = () => {
    return (
        <Box>
            {/* Method 1: Using className */}
            <Paper elevation={3} className="animate-fadeIn" sx={{ p: 3, mb: 2 }}>
                This fades in using a global CSS class.
            </Paper>

             {/* Method 2: Using sx prop (if keyframes defined globally or via Emotion) */}
             <Paper elevation={3} sx={{ p: 3, mb: 2, animation: 'slideInLeft 0.7s ease-out forwards' }}>
                This slides in using the sx prop.
            </Paper>

            {/* Remember: For conditional rendering (enter/exit), MUI Transitions (<Slide>, <Fade>) */}
            {/* or Framer Motion are often better choices. */}
        </Box>
    );
}
export default SomePage;