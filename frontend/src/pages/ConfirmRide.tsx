// src/pages/ConfirmRide.tsx
import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import Map from "../components/Map";
import DriverList from "../components/DriverList";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {EstimateRideResponse} from "../models/models";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ConfirmRide: React.FC = () => {
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
    const {state} = useLocation();
    const navigate = useNavigate();

    const rideResponse: EstimateRideResponse = state?.options;

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

    const handleChooseDriver = async (driverId: number) => {
        try {
            const response = await axios.patch('http://localhost:8080/ride/confirm',
                {
                    customer_id: state.customerId,
                    origin: state.originString,
                    destination: state.destinationString,
                    distance: distance,
                    duration: duration,
                    driver: {
                        id: driverId,
                        name: rideResponse.options.find(driver => driver.id === driverId)?.name
                    },
                    value: rideResponse.options.find(driver => driver.id === driverId)?.value

                }
            );
            console.log(response.data);
            navigate('/ride-history'); // Redireciona para o histórico de viagens
        } catch (error: any) {
            if (error.response && error.response.data) {
                setErrorMessages(error.response.data.message);
            } else {
                setErrorMessages(['Erro ao conectar com o servidor. Tente novamente.']);
            }
            console.error('Error confirm driver:', error);
        }
    };

    return (
        <Box sx={{mb: 4}}>

            <Container sx={{
                paddingTop: 8,
                paddingBottom: 8,
                bgcolor: 'secondary.main',
                display: 'flex',
                flexDirection: 'Column',
                alignItems: 'center',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
            }}>


                <Box sx={{ width: '80%'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
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
                        <Typography variant='h3' sx={{color: 'white', width: '100%', fontWeight: 'bold'}}>
                            Sua viagem
                        </Typography>
                    </Box>

                    <Map
                        origin={rideResponse.origin}
                        destination={rideResponse.destination}
                        encodedPolyline={rideResponse.routeResponse?.routes[0]?.polyline?.encodedPolyline}
                        apiKey={"AIzaSyCh-dcwXf1nnMd5YBDkrzVZB111O7NddM8"}
                    />

                    <Box sx={{
                        mt: 3,
                        padding: 4,
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
                            <Box sx={{display:'flex', marginTop:2}}>
                                <Box>
                                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                        Local De Saída
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        {state.originString}
                                    </Typography>
                                </Box>
                                <Box sx={{bgcolor: 'secondary.main', width: 4,marginLeft: 2, marginRight:2, borderRadius:2}}></Box>
                                <Box>
                                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                        Local de chegada
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        {state.destinationString}
                                    </Typography>
                                </Box>
                            </Box>
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
