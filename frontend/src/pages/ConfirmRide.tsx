// src/pages/ConfirmRide.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import Map from "../components/Map";
import DriverList from "../components/DriverList";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {EstimateRideResponse} from "../models/models";


const ConfirmRide: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // Verifique se 'state' e 'state.options' estão definidos
    const options: EstimateRideResponse = state?.options;

    // Se 'options' for indefinido, exiba uma mensagem de carregamento ou erro
    if (!options) {
        return (
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6">Carregando os detalhes da viagem...</Typography>
            </Box>
        );
    }

    const distance = options.distance; // Distância em km
    const durationString = options.duration; // Exemplo: "835s"
    const duration = durationString ? Math.floor(Number(durationString.replace('s', '')) / 60) : null;

    const handleChooseDriver = async (driverId: string) => {
        try {
            const response = await axios.post('http://localhost:8080/ride/confirm', { driver_id: driverId });
            console.log(response.data);
            navigate('/ride-history'); // Redireciona para o histórico de viagens
        } catch (error) {
            console.error('Erro ao confirmar a viagem:', error);
            alert('Erro ao confirmar a viagem. Tente novamente.');
        }
    };

    return (
        <Box sx={{ mb: 4 }}>
            {/* Mapa Estático */}
            <Map
                origin={options.origin}
                destination={options.destination}
                encodedPolyline={options.routeResponse?.routes[0]?.polyline?.encodedPolyline}
                apiKey={"AIzaSyCh-dcwXf1nnMd5YBDkrzVZB111O7NddM8"}
            />

            {/* Informações de Distância e Tempo */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Distância: {distance ? `${distance.toFixed(2)} km` : 'Carregando...'}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Tempo Estimado: {duration !== null ? `${duration} min` : 'Carregando...'}
                </Typography>
            </Box>

            {/* Lista de Motoristas */}
            <Typography variant="h5" gutterBottom>
                Escolha um Motorista
            </Typography>
            <DriverList drivers={options.options} />
        </Box>
    );
};

export default ConfirmRide;
