// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, Alert as MuiAlert, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // <-- Import useAuth hook

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = useAuth(); // <-- Get auth context

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    // ** TODO: Replace with actual API call **
    // Simulate API call & login
    try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        if (email === 'test@example.com' && password === 'password') {
            console.log('Mock Login Successful!');
            // Create a mock user object
            const mockUser = { id: 'user123', name: 'Test User', email: email };
            auth.login(mockUser); // <-- Call login from context
            navigate('/'); // Redirect to home page on success
        } else {
            throw new Error('Invalid email or password.');
        }
    } catch (err: any) {
        setError(err.message || 'Login failed. Please try again.');
    } finally {
         setLoading(false);
    }
  };

  // Redirect if already logged in
  if (auth.isAuthenticated) {
    navigate('/');
    return null; // Render nothing while redirecting
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={4} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal" required fullWidth id="email" label="Email Address" name="email"
            autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading}
          />
          <TextField
            margin="normal" required fullWidth name="password" label="Password" type="password" id="password"
            autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}
          />
           {error && <MuiAlert severity="error" sx={{ width: '100%', mt: 1 }}>{error}</MuiAlert>}
          <Button
            type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit"/> : 'Sign In'}
          </Button>
          <Box textAlign="center">
            <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
              {"Don't have an account? Sign Up"}
            </RouterLink>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;