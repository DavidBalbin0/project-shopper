import React, {useState} from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
interface RequestRideFormProps {
    onSubmit: (customerId: string, origin: string, destination: string) => void;
    errorMessages?: string[];
}

const RequestRideForm:  React.FC<RequestRideFormProps> = ({ onSubmit, errorMessages}) => {
    const [customerId, setCustomerId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(customerId, origin, destination);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
                Solicitar Viagem
            </Typography>
            {Array.isArray(errorMessages) && errorMessages.length > 0 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </Alert>
            )}
            <TextField
                label="ID do Usuário"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Endereço de Origem"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Endereço de Destino"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Estimar Valor da Viagem
            </Button>
        </Box>
    );
};

export default RequestRideForm;