// src/pages/Home.tsx
import React, {useState} from 'react';
import {Container, Typography, Button, Box, Alert, CircularProgress} from '@mui/material';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import RequestRideForm from "../components/RequestRideForm";
import LoadingScreen from './LoadingScreen';

const Home: React.FC = () => {
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (customerId: string, origin: string, destination: string) => {
        setLoading(true);
        setErrorMessages([]);

        if (!customerId || customerId.trim() === '') {
            setErrorMessages(['ID do usuário não pode estar vazio']);
            setLoading(false);
            return;
        }

        const customerIdNumber = Number(customerId);
        if (isNaN(customerIdNumber)) {
            setErrorMessages(['ID do usuário deve ser um número']);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/ride/estimate', {
                customer_id: customerIdNumber,
                origin,
                destination,
            });
            setLoading(false);
            navigate('/confirm-ride', {
                state: {
                    options: response.data,
                    customerId ,
                    originString: origin,
                    destinationString: destination
                }
            });
        } catch (error: any) {
            setLoading(false);
            if (error.response && error.response.data) {
                setErrorMessages(error.response.data.error_description);
                console.log(errorMessages)
            } else {
                setErrorMessages(['Erro ao conectar com o servidor. Tente novamente.']);
            }
            console.error('Error estimating ride:', error);
        }
    };
    if (loading) {
        return <LoadingScreen />;
    }

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
