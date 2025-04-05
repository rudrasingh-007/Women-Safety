// src/components/ReportIncidentModal.tsx
import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Box, Select, MenuItem, FormControl, InputLabel,
  SelectChangeEvent, CircularProgress, Alert as MuiAlert
} from '@mui/material';
import { reportIncident } from '../services/api'; // Import the API function

interface ReportIncidentModalProps {
  open: boolean;
  onClose: () => void;
  onReportSuccess: (message: string) => void; // Callback for success message
}

type Severity = 'Low' | 'Medium' | 'High';

const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({ open, onClose, onReportSuccess }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<Severity>('Medium');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSeverityChange = (event: SelectChangeEvent<Severity>) => {
    setSeverity(event.target.value as Severity);
  };

  const clearForm = () => {
      setDescription('');
      setLocation('');
      setSeverity('Medium');
      setError(null);
      setSubmitting(false);
  }

  const handleClose = () => {
      clearForm();
      onClose(); // Call the parent's close handler
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const result = await reportIncident({
        description,
        location,
        severity,
      });
      if (result.success) {
         onReportSuccess(result.message); // Notify parent of success
         handleClose(); // Close modal on success
      } else {
          setError(result.message || 'Failed to report incident.');
      }
    } catch (err: any) {
        console.error("Reporting error:", err);
        setError(err.message || 'An error occurred while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Report a Safety Concern</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please provide details about the incident or concern. Your report helps keep the community safe.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            label="Description of Incident"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting}
          />
          <TextField
            required
            margin="dense"
            id="location"
            label="Location (e.g., address, landmark)"
            type="text"
            fullWidth
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={submitting}
          />
          <FormControl fullWidth margin="dense" disabled={submitting}>
            <InputLabel id="severity-label">Severity</InputLabel>
            <Select
              labelId="severity-label"
              id="severity"
              value={severity}
              label="Severity"
              onChange={handleSeverityChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
           {error && <MuiAlert severity="error" sx={{ mt: 2 }}>{error}</MuiAlert>}
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button onClick={handleClose} disabled={submitting}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? <CircularProgress size={24} /> : 'Submit Report'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ReportIncidentModal;