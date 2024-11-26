import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import axios from "axios";
import {Driver} from "../models/models";

interface Ride {
    date: string;
    driverName: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    driver: Driver
}

const RideHistory: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [driverFilter, setDriverFilter] = useState("all");
    const [rides, setRides] = useState<Ride[]>([]);
    const [drivers, setDrivers] = useState<string[]>([
        "Bart Simpson",
        "Homer Simpson",
        "Marge Simpson",
    ]);

    const handleFetchRides = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/ride/${userId}`, {
                params: {
                    driver_id: driverFilter === "all" ? undefined : driverFilter,
                },
            });

            console.log("Dados recebidos da API:", response.data); // Inspecione os dados
            setRides(response.data.rides); // Atualize o estado
        } catch (error) {
            console.error("Erro ao buscar histórico de viagens:", error);
            alert("Erro ao buscar o histórico de viagens. Tente novamente.");
        }
    };

    useEffect(() => {
        console.log("Estado rides atualizado:", rides);
    }, [rides]); // Log para verificar mudanças no estado

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Histórico de Viagens
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                    label="ID do Usuário"
                    variant="outlined"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <TextField
                    select
                    label="Motorista"
                    value={driverFilter}
                    onChange={(e) => setDriverFilter(e.target.value)}
                >
                    <MenuItem value="all">Todos</MenuItem>
                    {drivers.map((driver) => (
                        <MenuItem key={driver} value={driver}>
                            {driver}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" onClick={handleFetchRides}>
                    Aplicar Filtro
                </Button>
            </Box>

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
                                    <TableCell>{ride.date}</TableCell>
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
        </Box>
    );
};

export default RideHistory;
