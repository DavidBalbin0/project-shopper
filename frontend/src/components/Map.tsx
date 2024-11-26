import React, {useEffect, useRef, useState} from 'react';
import { Box, Typography } from '@mui/material';

interface MapProps {
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    encodedPolyline: string;
    apiKey: string;
}

const Map: React.FC<MapProps> = ({ origin, destination, encodedPolyline, apiKey }) => {

    const boxRef = useRef<HTMLDivElement>(null);
    const [boxWidth, setBoxWidth] = useState<number>(0);

    useEffect(() => {
        if (boxRef.current) {
            setBoxWidth(boxRef.current.offsetWidth);
        }
    }, []);

    // Montando a URL da Google Static Maps API
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${boxWidth}x500&markers=color:green|label:A|${origin.lat},${origin.lng}&markers=color:red|label:B|${destination.lat},${destination.lng}&path=weight:3|color:blue|enc:${encodeURIComponent(encodedPolyline)}&key=${apiKey}`;
    console.log(mapUrl);
    return (
        <Box sx={{ mb: 4 }}>
            <Box
                sx={{
                    height: '500px',
                    // width: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#757575',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
                ref={boxRef}
            >
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
