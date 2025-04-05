// src/components/Layout/Header.tsx
import React from 'react';
// Corrected: Removed unused Tooltip import
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircle from '@mui/icons-material/AccountCircle';
// Dark mode icons previously removed
import { useAuth } from '../../contexts/AuthContext'; // Assumed path
// ColorMode context previously removed

const Header: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  // ColorMode usage previously removed
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const handleLogout = () => {
    handleClose();
    auth.logout();
    navigate('/login');
  };

  return (
    // AppBar color is now static based on the theme
    <AppBar position="sticky" elevation={1} color="primary">
      <Toolbar>
        <SecurityIcon sx={{ mr: 1, color: 'inherit' }} />
        <Typography
          variant="h6" component={RouterLink} to="/"
          sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold', flexGrow: 1 }}
        >
          Safety Companion
        </Typography>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            <Button color="inherit" component={RouterLink} to="/">Home</Button>
            <Button color="inherit" component={RouterLink} to="/map">Map</Button>
            <Button color="inherit" component={RouterLink} to="/alerts">Alerts</Button>
            <Button color="inherit" component={RouterLink} to="/tips">Tips</Button>
            <Button color="inherit" component={RouterLink} to="/faq">FAQ</Button>
        </Box>

        {/* Theme Toggle Button previously removed */}

        {/* Authentication Section */}
        <Box sx={{ ml: 2 }}> {/* Adjusted margin as toggle button is removed */}
            {auth.loading ? ( <CircularProgress color="inherit" size={24} />
            ) : auth.isAuthenticated ? ( /* Logged In State */
                <div>
                    <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                            {auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : <AccountCircle />}
                        </Avatar>
                    </IconButton>
                    <Menu
                        id="menu-appbar" anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorEl)} onClose={handleClose}
                        PaperProps={{
                           elevation: 2,
                           sx: {
                             overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
                             '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, },
                             '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0, },
                           },
                         }}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            ) : ( /* Logged Out State */
                <Button color="inherit" component={RouterLink} to="/login"> Login </Button>
            )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;