// src/types/index.ts (or separate files)

export interface SafetyAlert {
  id: string;
  timestamp: string; // ISO date string
  location: string; // e.g., "Near Central Park"
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

export interface SafetyTip {
  id: string;
  title: string;
  details: string;
  category: 'General' | 'Night' | 'PublicTransport' | 'Online';
}

export interface RiskArea {
  id: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
  riskLevel: number; // e.g., 1 to 5
  description?: string;
}