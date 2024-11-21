// src/components/Map.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Map = () => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Rota Estimada
            </Typography>
            <Box
                sx={{
                    height: '200px',
                    backgroundColor: '#e0e0e0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#757575',
                    borderRadius: 2,
                }}
            >
                Mapa (Rota Estimada)
            </Box>
        </Box>
    );
};

export default Map;
