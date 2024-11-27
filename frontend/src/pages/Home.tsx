// src/pages/Home.tsx
import React, {useState} from 'react';
import {Container, Typography, Button, Box, Alert} from '@mui/material';
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
            navigate('/confirm-ride', {
                state: {
                    options: response.data,
                    customerId,
                    originString: origin,
                    destinationString: destination
                }
            });
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
        <Box sx={{mb: 4}}>
            <Container
            sx={{
                paddingBottom: 8,
                bgcolor: 'secondary.main',
                display: 'flex',
                flexDirection: 'Column',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                height: '70vh',
            }}>


                <Typography variant="h3" align="center" gutterBottom sx={{color: 'white', mt: 5, fontWeight: ' bold'}}  >
                    Solicitação de Viagem
                </Typography>


                <RequestRideForm onSubmit={handleSubmit} errorMessages={errorMessages}/>


            </Container>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                <Button variant="contained" color="primary" onClick={() => navigate('/ride-history')}>
                    <Typography variant="h6" sx={{fontWeight: 'bold', padding: 1}}>
                        Ver histórico de viagens
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
