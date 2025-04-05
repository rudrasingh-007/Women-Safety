// src/styles/theme.ts
// Corrected: Removed unused PaletteOptions and Palette imports from the main import line
import { createTheme } from '@mui/material/styles';
import { blue, teal, grey, red, orange, green } from '@mui/material/colors';

// --- TypeScript Module Augmentation (If using custom properties like 'gradient') ---
// This declares the types for augmentation, they don't need to be imported at the top level
declare module '@mui/material/styles' {
  interface PaletteOptions {
    gradient?: string;
  }
  interface Palette {
    gradient: string;
  }
}

// --- Create the Static Theme Instance ---
const theme = createTheme({
  // --- Palette (Define your default theme, likely 'light' mode settings) ---
  palette: {
    mode: 'light', // Explicitly set the mode
    primary: {
      main: blue[700],
      light: blue[500],
      dark: blue[900],
      contrastText: '#ffffff',
    },
    secondary: {
      main: teal[600],
      light: teal[400],
      dark: teal[800],
      contrastText: '#ffffff',
    },
    error: { main: red[600] },
    warning: { main: orange[700] },
    info: { main: blue[500] },
    success: { main: green[600] },
    grey: grey,
    text: {
      primary: grey[900],      // Colors suitable for light background
      secondary: grey[700],
      disabled: grey[500],
    },
    background: {
      default: grey[100],      // Light background
      paper: '#ffffff',        // White paper
    },
    divider: grey[300],        // Lighter divider

    // Static gradient (doesn't change with mode)
    gradient: `linear-gradient(to right, ${blue[700]}, ${teal[600]})`,
  },

  // --- Typography ---
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 700, fontSize: '2rem' },
    h3: { fontWeight: 600, fontSize: '1.75rem' },
    h4: { fontWeight: 600, fontSize: '1.5rem' },
    h5: { fontWeight: 600, fontSize: '1.25rem' },
    h6: { fontWeight: 600, fontSize: '1.1rem' },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },

  // --- Shape ---
  shape: {
    borderRadius: 8,
  },

  // --- Components (Static overrides) ---
  components: {
    MuiAppBar: {
      defaultProps: { elevation: 1, color: 'primary' },
    },
    MuiButton: {
      defaultProps: { disableElevation: false },
      styleOverrides: { root: ({ theme }) => ({ borderRadius: theme.shape.borderRadius, padding: theme.spacing(1, 2) }) },
    },
    MuiCard: {
      defaultProps: { elevation: 2 },
      styleOverrides: { root: ({ theme }) => ({ borderRadius: theme.shape.borderRadius * 1.5 }) },
    },
    MuiTextField: { defaultProps: { variant: 'outlined', size: 'small' } },
    MuiChip: { styleOverrides: { root: ({ theme }) => ({ borderRadius: theme.shape.borderRadius * 2 }) } },
    MuiPaper: { styleOverrides: { root: ({ theme }) => ({ backgroundColor: theme.palette.background.paper }) } }, // Ensure paper uses correct background
    MuiLink: { defaultProps: { underline: 'hover' } }
  },
});


export default theme;