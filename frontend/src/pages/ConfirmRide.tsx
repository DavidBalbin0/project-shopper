// src/pages/ConfirmRide.tsx
import React, {useEffect, useState} from 'react';
import {Box, Container, Typography} from '@mui/material';
import Map from "../components/Map";
import DriverList from "../components/DriverList";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {EstimateRideResponse} from "../models/models";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ConfirmRide: React.FC = () => {
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
    const [googleApiKey, setGoogleApiKey] = useState<string | null>(null);
    const {state} = useLocation();
    const navigate = useNavigate();

    const rideResponse: EstimateRideResponse = state?.options;

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get('/api/config'); // Endpoint que criamos
                setGoogleApiKey(response.data.googleApiKey);
                console.log(response.data)
                console.log(response.data.googleApiKey)
            } catch (error) {
                console.error('Erro ao carregar a chave da API:', error);
            }
        };

        fetchConfig();
    }, []);

    if (!rideResponse) {
        return (
            <Box sx={{padding: 2}}>
                <Typography variant="h6">Carregando os detalhes da viagem...</Typography>
            </Box>
        );
    }

    const distance = rideResponse.distance;
    const durationString = rideResponse.duration;
    const duration = durationString ? Math.floor(Number(durationString.replace('s', '')) / 60) : null;
    console.log(process.env.REACT_APP_GOOGLE_API_KEY)
    const handleChooseDriver = async (driverId: number) => {
        try {
            const response = await axios.patch('/api/ride/confirm',
                {
                    customer_id: state.customerId,
                    origin: state.originString,
                    destination: state.destinationString,
                    distance: distance,
                    duration: durationString,
                    driver: {
                        id: driverId,
                        name: rideResponse.options.find(driver => driver.id === driverId)?.name
                    },
                    value: rideResponse.options.find(driver => driver.id === driverId)?.value

                }
            );
            console.log(response.data);
            navigate('/ride-history');
        } catch (error: any) {
            if (error.response && error.response.data) {
                setErrorMessages(error.response.data.message);

            } else {
                setErrorMessages(['Erro ao conectar com o servidor. Tente novamente.']);
            }
            alert(errorMessages)
            console.error('Error confirm driver:', error);
        }
    };

    return (
        <Box sx={{mb: 4}}>

            <Container sx={{
                paddingTop: 3,
                paddingBottom: 8,
                bgcolor: 'secondary.main',
                display: 'flex',
                flexDirection: 'Column',
                alignItems: 'center',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
            }}>


                <Box sx={{width: '80%'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                        <Box
                            onClick={() => navigate('/')}

                            sx={{
                                bgcolor: 'white',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                paddingInline: 1,
                                height: '100%',
                                mr: 2,
                                cursor: 'pointer',
                            }}>
                            <KeyboardBackspaceIcon fontSize='large'/>

                        </Box>
                        <Typography variant='h3' sx={{color: 'white', width: '100%', fontWeight: 'bold', }}>
                            Sua viagem
                        </Typography>
                    </Box>

                    <Map
                        origin={rideResponse.origin}
                        destination={rideResponse.destination}
                        encodedPolyline={rideResponse.routeResponse?.routes[0]?.polyline?.encodedPolyline}
                        apiKey={googleApiKey}
                    />

                    <Box sx={{
                        mt: 3,
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'primary.main',
                        borderRadius: 2,
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                bgcolor: 'primary.main',
                                borderRadius: 2,
                            }}>
                            <Box>
                                <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                                    Distância Estimada
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    {distance ? `${distance.toFixed(2)} km` : 'Carregando...'}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                                    Tempo Estimado
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    {duration !== null ? `${duration} min` : 'Carregando...'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row', marginTop: 2}}>
                            <Box>
                                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                    Saída
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {state.originString}
                                </Typography>
                            </Box>
                            <Box sx={{
                                bgcolor: 'secondary.main',
                                width: 4,
                                marginLeft: 2,
                                marginRight: 2,
                                borderRadius: 2
                            }}>
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                    Chegada
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {state.destinationString}
                                </Typography>
                            </Box>



                        </Box>

                    </Box>

                </Box>

            </Container>
            <Container sx={{
                width: '80%'
            }}>
                <Typography variant="h4" sx={{fontWeight: 'bold', mt: 2}} gutterBottom>
                    Escolha um Motorista
                </Typography>
                <DriverList drivers={rideResponse.options} handleChooseDriver={handleChooseDriver}/>
            </Container>


        </Box>
    );
};

export default ConfirmRide;
