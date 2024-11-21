// @ts-ignore
import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const RequestRideForm = () => {
    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
                Solicitar Viagem
            </Typography>
            <TextField
                fullWidth
                label="Endereço de Origem"
                variant="outlined"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Endereço de Destino"
                variant="outlined"
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Estimar Viagem
            </Button>
        </Box>
    );
};

export default RequestRideForm;
