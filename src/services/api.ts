// src/services/api.ts

import { mockAlerts, mockTips, mockRiskAreas } from '../data/mockData';
import { SafetyAlert, SafetyTip, RiskArea } from '../types';

// --- Configuration ---
const SIMULATED_DELAY = 600; // Simulate network latency in milliseconds

// --- Interfaces ---

// Payload for reporting an incident
interface ReportPayload {
  description: string;
  location: string; // Could be coordinates or text description
  severity: 'Low' | 'Medium' | 'High';
}

// --- Mock API Functions ---

/**
 * Simulates fetching safety alerts from an API.
 * @returns A Promise resolving with an array of SafetyAlert objects.
 */
export const fetchAlerts = (): Promise<SafetyAlert[]> => {
  console.log('API: Attempting to fetch alerts...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('API: Alerts fetched successfully (mock).');
      // Return a copy to prevent direct mutation of mockData
      resolve([...mockAlerts]);
      // NOTE: The intentional random failure has been removed for smoother development.
      //       Real error handling will be needed when connecting to a live backend.
    }, SIMULATED_DELAY);
  });
};

/**
 * Simulates fetching safety tips from an API.
 * @returns A Promise resolving with an array of SafetyTip objects.
 */
export const fetchTips = (): Promise<SafetyTip[]> => {
  console.log('API: Attempting to fetch tips...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('API: Tips fetched successfully (mock).');
      // Return a copy
      resolve([...mockTips]);
    }, SIMULATED_DELAY - 150); // Slightly different delay for variety
  });
};

/**
 * Simulates fetching risk area data for the map.
 * @returns A Promise resolving with an array of RiskArea objects.
 */
export const fetchRiskAreas = (): Promise<RiskArea[]> => {
  console.log('API: Attempting to fetch risk areas...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('API: Risk areas fetched successfully (mock).');
      // Return a copy
      resolve([...mockRiskAreas]);
    }, SIMULATED_DELAY + 100); // Slightly different delay
  });
};

/**
 * Simulates reporting a safety incident to the backend.
 * @param payload - The details of the incident to report.
 * @returns A Promise resolving with a success status and message.
 */
export const reportIncident = (payload: ReportPayload): Promise<{ success: boolean; message: string }> => {
  console.log('API: Attempting to report incident...', payload);
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would POST data to the backend and wait for a response.
      // Here, we just simulate a successful report.
      console.log('API: Incident report submitted successfully (simulated).');
      resolve({ success: true, message: 'Incident reported successfully!' });
    }, SIMULATED_DELAY);
  });
};

/*
 * Note on Authentication:
 * In our current setup (Phase 6), login/signup logic is simulated directly
 * within the LoginPage/SignupPage components interacting with the AuthContext.
 * If you were to centralize *all* API interactions, you might add functions here like:
 *
 * export const loginUser = (credentials): Promise<{ user: User; token: string }> => { ... }
 * export const signupUser = (userInfo): Promise<{ success: boolean; message: string }> => { ... }
 *
 * But for now, the context handles the *state* after the component simulates the API call.
 */