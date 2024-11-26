// src/pages/Home.tsx
import React, {useState} from 'react';
import { Container, Typography, Button, Box, Alert } from '@mui/material';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import RequestRideForm from "../components/RequestRideForm";

const Home: React.FC = () => {
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (customerId: string, origin: string, destination: string) => {
        setErrorMessages([]);

        try {
            const response = await axios.post('http://localhost:8080/ride/estimate', {
                customer_id: customerId,
                origin,
                destination,
            });
            navigate('/confirm-ride', { state: { options: response.data, customerId, originString: origin, destinationString: destination } });
        } catch (error: any) {
            if (error.response && error.response.data) {
                const messages = Array.isArray(error.response.data.message)
                    ? error.response.data.message
                    : [error.response.data.message];
                setErrorMessages(messages);
                console.log(errorMessages)
            } else {
                setErrorMessages(['Erro ao conectar com o servidor. Tente novamente.']);
            }
            console.error('Error estimating ride:', error);
        }
    };
    return (
        <Container sx={{ mt: 4 }}>

            <Typography variant="h3" align="center" gutterBottom>
                Solicitação de Viagem
            </Typography>


            <RequestRideForm onSubmit={handleSubmit} errorMessages={errorMessages}/>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button variant="contained" color="secondary" onClick={() => navigate('/ride-history')}>
                    Ver histórico de viagens
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
