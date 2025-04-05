// src/pages/HomePage.tsx
import React, { useState } from 'react';
import {
    Typography, Container, Button, Snackbar, Alert as MuiAlert,
    Card, CardContent, CardActions, Paper,
    Stack, // Use Stack for layout
    Box, // <--- ADD Box BACK TO THE IMPORT
    useTheme
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
import ReportIncidentModal from '../components/ReportIncidentModal';

// Icons
import AddAlertIcon from '@mui/icons-material/AddAlert';
import MapIcon from '@mui/icons-material/Map';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InsightsIcon from '@mui/icons-material/Insights'; // Icon for Analysis
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // Icon for Reliability
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Icon for Support

import { useAuth } from '../contexts/AuthContext';

// --- Framer Motion Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] // Smooth easing
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each child animation
      delayChildren: 0.1 // Initial delay before first child starts
    }
  }
};

// --- Component ---
const HomePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme = useTheme();
  const auth = useAuth();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Corrected: Prefix unused 'event' parameter with underscore
  const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') { return; }
    setSnackbarOpen(false);
  };

  const handleReportSuccess = (message: string) => {
      setSnackbarMessage(message);
      setSnackbarOpen(true);
  }

  // Style object for dashboard cards hover effect
  const cardHoverStyle = {
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
          transform: 'translateY(-5px) scale(1.02)', // Slightly more lift and scale
          boxShadow: theme.shadows[8], // More prominent shadow on hover
      },
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'background.paper', // Ensure card background is distinct
      borderRadius: theme.shape.borderRadius * 1.5, // Use slightly more rounded cards
      height: '100%', // Make cards fill the height of their container (Box)
  };

  // Wrap MUI components with motion for animation capabilities
  const MotionContainer = motion(Container);
  const MotionTypography = motion(Typography);
  const MotionPaper = motion(Paper);
  const MotionBox = motion(Box); // Use MotionBox for card containers
  const MotionButton = motion(Button);
  // Corrected: Removed unused MotionCard alias
  // const MotionCard = motion(Card);

  return (
    <MotionContainer
        maxWidth="lg"
        sx={{ py: { xs: 3, sm: 4, md: 5 } }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp} // Simple fade in for the whole page container
    >

      {/* Welcome Heading - Removed component prop */}
      <MotionTypography
        variant="h4"
        // component="h1" // REMOVED
        gutterBottom
        sx={{ mb: 2, fontWeight: 'bold', color: 'primary.dark', textAlign: { xs: 'center', sm: 'left' } }}
        variants={fadeInUp} // Animate heading
      >
        Welcome{auth.isAuthenticated && auth.user ? `, ${auth.user.name}` : ''}! Stay Safe!
      </MotionTypography>

      {/* Introduction Text */}
      <MotionTypography
        variant="body1"
        sx={{ mb: { xs: 4, md: 5 }, color: 'text.secondary', lineHeight: 1.7, textAlign: { xs: 'center', sm: 'left' }, maxWidth: '750px', mx: { xs: 'auto', sm: 0 } }} // Limit width slightly
        variants={fadeInUp} // Animate intro text
        transition={{ delay: 0.1 }} // Slight delay after heading
      >
        Your personal safety dashboard. Check the map for real-time risk assessments, view recent alerts, access safety tips, and report concerns you observe.
      </MotionTypography>

      {/* --- Layout using Stack (Vertical Arrangement for main sections) --- */}
      <Stack spacing={{ xs: 3, md: 4 }} component={motion.div} variants={fadeInUp} transition={{ delay: 0.2 }}>

          {/* Report Concern Area */}
          <MotionPaper
            elevation={4} // Slightly more elevation
            sx={{
                p: { xs: 3, sm: 4 }, // Increase padding
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: theme.palette.gradient || theme.palette.primary.light, // Use gradient or fallback
                borderRadius: theme.shape.borderRadius * 2, // More rounded
                minHeight: '220px',
                color: 'primary.contrastText', // Ensure text contrasts with gradient
                overflow: 'hidden', // Needed if using pseudo elements for effects
            }}
            variants={fadeInUp} // Animate this section
           >
               <MotionTypography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }} variants={fadeInUp}>
                   Observe Something?
               </MotionTypography>
               <MotionTypography variant="body1" sx={{ mb: 3, maxWidth: '450px', opacity: 0.9 }} variants={fadeInUp}>
                   Help keep the community safe by reporting incidents or concerns.
               </MotionTypography>
              {/* Animate the button */}
              <MotionButton
                  variant="contained"
                  sx={{
                      bgcolor: 'white', color: 'primary.main', py: 1.5, px: 4, // Larger padding
                      borderRadius: '50px', // Pill shape
                      fontWeight: 'bold',
                      boxShadow: theme.shadows[3],
                      '&:hover': {
                          bgcolor: grey[100], // Lighter grey on hover
                          boxShadow: theme.shadows[5],
                       }
                  }}
                  startIcon={<AddAlertIcon />} onClick={handleOpenModal} size="large"
                  // Add hover and tap animations
                  whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                  whileTap={{ scale: 0.95 }}
                  variants={fadeInUp}
              >
                  Report a Concern
              </MotionButton>
          </MotionPaper>

          {/* Quick Links/Navigation & Feature Cards Section */}
          {/* Use motion(Box) with stagger variants for the card container */}
          {/* Using Stack with wrap for layout instead of Grid */}
          <MotionBox
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              // Removed viewport prop for simplicity, animates on load
          >
              {/* Use Stack with wrap enabled for layout */}
              <Stack
                  direction="row" // Arrange items in a row
                  spacing={{ xs: 2, sm: 3 }} // Spacing between items
                  useFlexGap // Better spacing control with wrapping
                  flexWrap="wrap" // Allow items to wrap to the next line
                  sx={{ justifyContent: 'center', alignItems: 'stretch' }} // Center items and make them stretch vertically
              >

                  {/* Map Card */}
                  {/* Apply fadeInUp to MotionBox container */}
                  <MotionBox variants={fadeInUp} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' } }}> {/* Adjust width for wrapping */}
                      <Card sx={cardHoverStyle}> {/* Card can be regular MUI Card */}
                          <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                              <MapIcon color="primary" sx={{ fontSize: 48, mb: 1.5 }} />
                              <Typography variant="h6" gutterBottom>Safety Map</Typography>
                              <Typography variant="body2" color="text.secondary">View real-time risk zones and plan safe routes.</Typography>
                          </CardContent>
                          <CardActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
                              <Button size="small" component={RouterLink} to="/map" variant="outlined">View Map</Button>
                          </CardActions>
                      </Card>
                  </MotionBox>

                  {/* Alerts Card */}
                  <MotionBox variants={fadeInUp} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' } }}>
                      <Card sx={cardHoverStyle}>
                           <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                              <NotificationsActiveIcon color="primary" sx={{ fontSize: 48, mb: 1.5 }} />
                              <Typography variant="h6" gutterBottom>Alerts</Typography>
                              <Typography variant="body2" color="text.secondary">Check the latest safety alerts in your area.</Typography>
                          </CardContent>
                           <CardActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
                              <Button size="small" component={RouterLink} to="/alerts" variant="outlined">View Alerts</Button>
                          </CardActions>
                      </Card>
                  </MotionBox>

                  {/* Tips Card */}
                  <MotionBox variants={fadeInUp} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' } }}>
                      <Card sx={cardHoverStyle}>
                           <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                              <LightbulbIcon color="primary" sx={{ fontSize: 48, mb: 1.5 }} />
                              <Typography variant="h6" gutterBottom>Safety Tips</Typography>
                              <Typography variant="body2" color="text.secondary">Get AI-powered safety tips based on context.</Typography>
                          </CardContent>
                           <CardActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
                              <Button size="small" component={RouterLink} to="/tips" variant="outlined">Get Tips</Button>
                          </CardActions>
                      </Card>
                  </MotionBox>

                  {/* --- ADDED FEATURE CARDS --- */}

                  {/* Accurate Analysis Card */}
                  <MotionBox variants={fadeInUp} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' } }}>
                      <Card sx={cardHoverStyle}>
                           <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                              <InsightsIcon color="secondary" sx={{ fontSize: 48, mb: 1.5 }} /> {/* Used Insights Icon & secondary color */}
                              <Typography variant="h6" gutterBottom>Accurate Analysis</Typography>
                              <Typography variant="body2" color="text.secondary">AI models analyze data for precise risk insights.</Typography>
                          </CardContent>
                           {/* Optional: Add actions if this card should link somewhere */}
                      </Card>
                  </MotionBox>

                  {/* Reliable Results Card */}
                  <MotionBox variants={fadeInUp} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' } }}>
                      <Card sx={cardHoverStyle}>
                           <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                              <VerifiedUserIcon color="secondary" sx={{ fontSize: 48, mb: 1.5 }} /> {/* Used Verified Icon & secondary color */}
                              <Typography variant="h6" gutterBottom>Reliable Results</Typography>
                              <Typography variant="body2" color="text.secondary">Trustworthy alerts and information when you need it.</Typography>
                          </CardContent>
                           {/* Optional Actions */}
                      </Card>
                  </MotionBox>

                  {/* Help & Support Card */}
                  <MotionBox variants={fadeInUp} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' } }}>
                      <Card sx={cardHoverStyle}>
                           <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                              <SupportAgentIcon color="secondary" sx={{ fontSize: 48, mb: 1.5 }} /> {/* Used Support Icon & secondary color */}
                              <Typography variant="h6" gutterBottom>Help & Support</Typography>
                              <Typography variant="body2" color="text.secondary">Access FAQs and contact support easily.</Typography>
                          </CardContent>
                           <CardActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
                               {/* Link this button to the FAQ page */}
                              <Button size="small" component={RouterLink} to="/faq" variant="outlined">Go to FAQ</Button>
                          </CardActions>
                      </Card>
                  </MotionBox>
                  {/* --------------------------- */}

            </Stack> {/* End Card Stack */}
          </MotionBox>

      </Stack> {/* End Main Vertical Stack */}

      {/* --- Modal Component --- */}
      <ReportIncidentModal
        open={modalOpen}
        onClose={handleCloseModal}
        onReportSuccess={handleReportSuccess}
       />

      {/* --- Success Snackbar --- */}
      <Snackbar
         open={snackbarOpen}
         autoHideDuration={5000}
         onClose={handleSnackbarClose}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

    </MotionContainer>
  );
};

export default HomePage;