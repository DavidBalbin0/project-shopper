// src/pages/Home.tsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Form from '../components/RequestRideForm';
import Map from '../components/Map';
import DriverList from '../components/DriverList';

const Home = () => {
    return (
        <Container sx={{ mt: 4 }}>
            {/* Título */}
            <Typography variant="h3" align="center" gutterBottom>
                Solicitação de Viagem
            </Typography>

            {/* Formulário de Solicitação */}
            <Form />

            {/* Mapa Estático */}
            <Map />

            {/* Lista de Motoristas */}
            <Typography variant="h5" gutterBottom>
                Escolha um Motorista
            </Typography>
            <DriverList />

            {/* Botão de Confirmar Viagem */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button variant="contained" color="secondary">
                    Confirmar Viagem
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
