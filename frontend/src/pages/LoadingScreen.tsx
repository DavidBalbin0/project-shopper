import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
    return (
        <Box
            sx={{
        display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
    }}
>
    <CircularProgress color="secondary" />
        </Box>
);
};

export default LoadingScreen;
