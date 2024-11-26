// src/components/DriverCard.tsx
import React from 'react';
import {Card, CardContent, Typography, Rating, Button} from '@mui/material';
import {useNavigate} from "react-router-dom";

interface DriverCardProps {
    name: string;
    vehicle: string;
    description: string;
    rating: number;
    review: string;
    value: number;
    handleChooseDriver: () => void;
}

const DriverCard: React.FC<DriverCardProps> = ({name, vehicle, description, rating, review, value, handleChooseDriver}) => {
    return (
        <Card sx={{ width: '100%', borderRadius: 4, boxShadow: 10}}>
            <CardContent>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="text.secondary">{vehicle}</Typography>
                <Typography variant="body1" sx={{mt: 1}}>{description}</Typography>
                <Rating value={rating} readOnly/>
                <Typography variant="body2" sx={{mt: 1}}>{review}</Typography>
                <Typography variant="h6" sx={{mt: 2}}>R${value.toFixed(2)}</Typography>
                <Button variant="contained" color="secondary" onClick={handleChooseDriver}>
                    Confirmar Viagem
                </Button>
            </CardContent>
        </Card>
    );
};

export default DriverCard;
