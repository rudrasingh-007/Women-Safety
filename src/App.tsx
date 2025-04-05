// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import AlertsPage from './pages/AlertsPage';
import TipsPage from './pages/TipsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FAQPage from './pages/FAQPage'; // <-- Import FAQPage
import { Typography } from '@mui/material';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/faq" element={<FAQPage />} /> {/* <-- Add FAQ Route */}
        {/* Help route previously removed */}
        <Route path="*" element={<Typography variant="h4">404 Not Found</Typography>} />
      </Routes>
    </Layout>
  );
}

export default App;