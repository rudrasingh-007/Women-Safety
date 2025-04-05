// src/components/Layout/Layout.tsx
import React, { ReactNode } from 'react';
import Header from './Header'; // Keep Header
import Footer from './Footer';
// import BottomNav from './BottomNav'; // Remove BottomNav import
import { Box, Container } from '@mui/material'; // Remove useMediaQuery, useTheme

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const theme = useTheme(); // Remove
  // const isDesktop = useMediaQuery(theme.breakpoints.up('sm')); // Remove

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Always render Header */}
      <Header />

      <Container
        component="main"
        sx={{
            mt: 4, // Consistent margin top
            mb: 4, // Consistent margin bottom (revert mobile adjustment)
            flexGrow: 1
         }}
      >
        {children}
      </Container>

      {/* Always render Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;