import React, {useState} from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import * as zlib from "node:zlib";

const RequestRideForm:  React.FC = () => {
    const [customerId, setCustomerId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [error, setError] = useState<string | null>(null); // Estado para a mensagem de erro
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null); // Limpa o erro anterior antes de uma nova tentativa

        try {
            const response = await axios.post('http://localhost:8080/ride/estimate', {
                customer_id: customerId,
                origin,
                destination,
            });
            navigate('/confirm-ride', { state: { options: response.data } });
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Define a mensagem de erro vinda da API
                setError(error.response.data.error_description || 'Erro desconhecido.');
            } else {
                // Mensagem genérica para erros inesperados
                setError('Erro ao conectar com o servidor. Tente novamente.');
            }
            console.error('Error estimating ride:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
                Solicitar Viagem
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
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
