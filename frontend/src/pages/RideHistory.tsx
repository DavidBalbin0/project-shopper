import React, {useState, useEffect} from "react";
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
} from "@mui/material";
import axios from "axios";
import {Driver} from "../models/models";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate} from "react-router-dom";

interface Ride {
    driverName: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    driver: Driver,
    date: string;
}

const RideHistory: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [driverFilter, setDriverFilter] = useState("all");
    const [rides, setRides] = useState<Ride[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const navigate = useNavigate();

    const handleFetchRides = async () => {
        try {
            const response = await axios.get(`/api/ride/${userId}`, {
                params: {
                    driver_id: driverFilter === "all" ? undefined : driverFilter,
                },
            });

            console.log("Dados recebidos da API:", response.data);
            setRides(response.data.rides);
        } catch (error: any) {
            if (error.response && error.response.data) {
                alert(error.response.data.error_description);
            } else {
                alert(['Erro ao conectar com o servidor. Tente novamente.']);
            }
            console.error('Error estimating ride:', error);
        }
    };

    const fetchDrivers = async () => {
        try {
            const response = await axios.get("/api/drivers");
            setDrivers(response.data);
        } catch (error) {
            console.error("Erro ao buscar motoristas:", error);
            alert("Erro ao buscar motoristas. Tente novamente.");
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <Box sx={{}}>
            <Container
                sx={{
                    py: 2,
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    flexDirection: 'Column',
                    alignItems: 'center',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,

                }}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
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

                    <Typography variant="h4" gutterBottom sx={{color: 'white', mb: 0}}>
                        Histórico de Viagens
                    </Typography>
                </Box>
                <Box sx={{display: "flex", gap: 2, mb: 3}}>
                    <TextField
                        label="ID do Usuário"
                        variant="outlined"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        color='primary'
                        sx={{
                            // Estado padrão
                            '& .MuiOutlinedInput-root': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white', // Cor da borda padrão
                                },
                            },

                            // Ao passar o mouse
                            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#59FF57', // Cor da borda ao passar o mouse
                            },

                            // Quando o campo está focado
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#59FF57', // Cor da borda quando focado
                            },

                            // Cor do texto no input
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },

                            // Cor do rótulo padrão
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },

                            // Cor do rótulo ao focar
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#59FF57',
                            },
                        }}

                    />
                    <TextField
                        select
                        label="Motorista"
                        value={driverFilter}
                        onChange={(e) => setDriverFilter(e.target.value)}
                        color='primary'
                        sx={{
                            // Estado padrão
                            '& .MuiOutlinedInput-root': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white', // Cor da borda padrão
                                },
                            },

                            // Ao passar o mouse
                            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#59FF57', // Cor da borda ao passar o mouse
                            },

                            // Quando o campo está focado
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#59FF57', // Cor da borda quando focado
                            },

                            // Cor do texto no input
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },

                            // Cor do rótulo padrão
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },

                            // Cor do rótulo ao focar
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#59FF57',
                            },
                        }}
                    >
                        <MenuItem value="all">Todos</MenuItem>
                        {drivers.map((driver) => (
                            <MenuItem key={driver.id} value={driver.id}>
                                {driver.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" sx={{fontWeight: 'bold'}} onClick={handleFetchRides}>
                        Aplicar Filtro
                    </Button>
                </Box>
            </Container>
            <Container sx={{p: 2}}>


                {rides.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Data e Hora</TableCell>
                                    <TableCell>Motorista</TableCell>
                                    <TableCell>Origem</TableCell>
                                    <TableCell>Destino</TableCell>
                                    <TableCell>Distância (km)</TableCell>
                                    <TableCell>Tempo (min)</TableCell>
                                    <TableCell>Valor (R$)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rides.map((ride, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{new Date(ride.date).toLocaleString()}</TableCell>
                                        <TableCell>{ride.driver.name}</TableCell>
                                        <TableCell>{ride.origin}</TableCell>
                                        <TableCell>{ride.destination}</TableCell>
                                        <TableCell>{ride.distance.toFixed(2)}</TableCell>
                                        <TableCell>
                                            {Math.floor(
                                                Number(ride.duration.replace("s", "")) / 60
                                            )}
                                        </TableCell>
                                        <TableCell>{ride.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="body1">Nenhuma viagem encontrada.</Typography>
                )}
            </Container>
        </Box>
    );
};

export default RideHistory;
