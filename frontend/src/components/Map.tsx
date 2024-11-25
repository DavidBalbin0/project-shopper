import React from 'react';
import { Box, Typography } from '@mui/material';

interface MapProps {
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    encodedPolyline: string;
    apiKey: string;
}

const Map: React.FC<MapProps> = ({ origin, destination, encodedPolyline, apiKey }) => {
    // Montando a URL da Google Static Maps API
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:green|label:A|${origin.lat},${origin.lng}&markers=color:red|label:B|${destination.lat},${destination.lng}&path=weight:3|color:blue|enc:${encodeURIComponent(encodedPolyline)}&key=${apiKey}`;
    console.log(mapUrl);
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Rota Estimada
            </Typography>
            <Box
                sx={{
                    height: '400px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#757575',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Renderizando o mapa como uma imagem */}
                <img
                    src={mapUrl}
                    alt="Mapa com a rota estimada"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
        </Box>
    );
};

export default Map;
