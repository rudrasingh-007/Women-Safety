// src/pages/MapPage.tsx

import React, { useState, useEffect } from 'react'; // React import can be removed if not using React.<> fragments etc.
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
// Corrected: Removed unused MuiAlert import
import { Typography, Box, CircularProgress, Paper } from '@mui/material';
import { mockRiskAreas } from '../data/mockData'; // Using mock data directly for now
// If fetching dynamically: import { fetchRiskAreas } from '../services/api';
import { RiskArea } from '../types';
import { LatLngExpression, LatLng } from 'leaflet';

// --- Leaflet Icon Fix --- (Essential)
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png'; // Correct import for Vite/CRA
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow, iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
L.Marker.prototype.options.icon = DefaultIcon;
// --- End Icon Fix ---

// Function to determine circle color based on risk level
const getRiskColor = (level: number): string => {
    // Your specific color logic (Green, Yellow, Orange, Reds)
    if (level === 1) return '#00FF00'; // Green for low risk
    if (level === 2) return '#FFFF00'; // Yellow for moderate risk
    if (level === 3) return '#FFA500'; // Orange for high risk
    if (level === 4) return '#FF4500'; // Red-Orange for very high risk
    if (level === 5) return '#FF0000'; // Red for extreme risk
    return '#808080'; // Default gray for unknown risk
};

// Generates path options for Leaflet Circle
const getRiskPathOptions = (level: number) => ({
    color: getRiskColor(level),       // Outline color
    fillColor: getRiskColor(level),   // Fill color
    fillOpacity: 0.3                  // Fill opacity
});


// Component to handle map events like clicks (Optional)
const MapClickHandler: React.FC<{ onMapClick: (latlng: LatLng) => void }> = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng); // Call the passed handler with coordinates
        },
    });
    return null; // This component doesn't render anything itself
}

const MapPage: React.FC = () => {
  // --- UPDATED DEFAULT COORDINATES ---
  const defaultCoords: LatLngExpression = [28.474389, 77.504]; // Approx. 28°28'27.8"N 77°30'14.4"E
  // ------------------------------------

  const [center, setCenter] = useState<LatLngExpression>(defaultCoords); // Initialize center with new default
  const [currentPosition, setCurrentPosition] = useState<LatLngExpression | null>(null);
  const [riskAreas] = useState<RiskArea[]>(mockRiskAreas); // Using mock data directly
  const [loadingPosition, setLoadingPosition] = useState<boolean>(true);
  // Add state for dynamic fetching if needed:
  // const [loadingAreas, setLoadingAreas] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null); // If using error state, MuiAlert would be needed

  // Get user's current location (basic example)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos: LatLngExpression = [position.coords.latitude, position.coords.longitude];
        setCurrentPosition(pos);
        setCenter(pos); // Update center when location is found
        setLoadingPosition(false);
      },
      (error) => {
        console.error("Geolocation Error:", error);
        // Keep the default center if geolocation fails or is denied
        setLoadingPosition(false); // Still stop loading
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    // Fetch risk areas dynamically if needed:
    // const loadRiskAreas = async () => {
    //    setLoadingAreas(true); setError(null);
    //    try { /* fetch */ } catch (e: any) { setError(e.message); }
    //    finally { setLoadingAreas(false); }
    // };
    // loadRiskAreas();

  }, []); // Run once on mount


  const handleMapClick = (latlng: LatLng) => {
      console.log(`Map clicked at: Lat: ${latlng.lat}, Lng: ${latlng.lng}`);
      // Future idea: Open report modal pre-filled with these coordinates
  };

  if (loadingPosition && !currentPosition) { // Show loading only while waiting for the *first* position fix
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Finding your location...</Typography>
        </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ height: '75vh', width: '100%', p: { xs: 1, sm: 2 }, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ flexShrink: 0 }}>
        Interactive Safety Map
      </Typography>

      {/* Optional: Add error display here if fetching risk areas dynamically */}
      {/* If you uncomment this, you MUST re-import MuiAlert and use the setError state */}
      {/* {error && <MuiAlert severity="error" sx={{ mb: 2 }}>{error}</MuiAlert>} */}

      <Box sx={{ flexGrow: 1, height: '100%', width: '100%', borderRadius: 1, overflow: 'hidden', backgroundColor: 'grey.200' }}> {/* Ensure Box takes remaining space */}
         <MapContainer
            center={center} // Use the state variable which updates on location found or stays default
            zoom={14}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
         >
             {/* Default OpenStreetMap Tile Layer */}
            <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // *** WARNING: Consider usage limits for production! ***
            />

            {/* User Location Marker */}
            {currentPosition && ( // Render marker only if position is known
                <Marker position={currentPosition}>
                    <Popup>You are here (approx.)</Popup>
                </Marker>
            )}


            {/* Render Risk Areas */}
            {riskAreas.map(area => (
            <Circle
                key={area.id}
                center={[area.latitude, area.longitude]}
                radius={area.radius}
                pathOptions={getRiskPathOptions(area.riskLevel)} // Use combined pathOptions
            >
                <Popup>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>
                        Risk Level: {area.riskLevel}/5
                    </Typography>
                    <Typography variant="body2">
                        {area.description || 'Designated risk area.'}
                    </Typography>
                </Popup>
            </Circle>
            ))}

            {/* Component to handle map clicks */}
            <MapClickHandler onMapClick={handleMapClick} />

        </MapContainer>

      </Box>
    </Paper>
  );
};

export default MapPage;