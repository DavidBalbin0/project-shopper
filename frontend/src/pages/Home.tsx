// src/pages/Home.tsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Form from '../components/RequestRideForm';
import {useNavigate} from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/ride-history');
    };
    return (
        <Container sx={{ mt: 4 }}>

            <Typography variant="h3" align="center" gutterBottom>
                Solicitação de Viagem
            </Typography>

            {/* Formulário de Solicitação */}
            <Form />

            {/* Botão de Confirmar Viagem */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button variant="contained" color="secondary" onClick={handleNavigate}>
                    Ver histórico de viagens
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
