// src/data/mockData.ts
import { SafetyAlert, SafetyTip, RiskArea } from '../types';

export const mockAlerts: SafetyAlert[] = [
  { id: 'a1', timestamp: new Date(Date.now() - 3600000).toISOString(), location: 'Downtown Crossing', description: 'Reports of suspicious individual following pedestrians.', severity: 'Medium' },
  { id: 'a2', timestamp: new Date(Date.now() - 86400000).toISOString(), location: 'City Park West Entrance', description: 'Area lighting malfunctioning, reduced visibility.', severity: 'Low' },
  { id: 'a3', timestamp: new Date(Date.now() - 172800000).toISOString(), location: 'Maple Street (100 block)', description: 'Attempted mugging reported last evening.', severity: 'High' },
];

export const mockTips: SafetyTip[] = [
  { id: 't1', title: 'Stay Aware of Surroundings', details: 'Avoid distractions like phones or headphones, especially when walking alone.', category: 'General' },
  { id: 't2', title: 'Share Your Location', details: 'Let a trusted friend or family member know your route and ETA when travelling, especially at night.', category: 'Night' },
  { id: 't3', title: 'Trust Your Instincts', details: 'If a situation feels unsafe, leave immediately. Don\'t worry about being polite.', category: 'General' },
  { id: 't4', title: 'Sit Near the Driver', details: 'On buses or trains, choose a seat near the driver or in a well-lit, populated area.', category: 'PublicTransport' },
];

// Example coordinates (e.g., around Boston)
export const mockRiskAreas: RiskArea[] = [
  { id: 'r1', latitude: 42.3584, longitude: -71.0598, radius: 200, riskLevel: 4, description: 'High frequency of petty theft reports' },
  { id: 'r2', latitude: 42.3601, longitude: -71.0589, radius: 100, riskLevel: 2, description: 'Poor lighting reported' },
  { id: 'r3', latitude: 42.3550, longitude: -71.0630, radius: 300, riskLevel: 5, description: 'Recent assault reports' },
];