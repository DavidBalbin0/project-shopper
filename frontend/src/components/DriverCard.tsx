import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

interface DriverProps {
    name: string
    vehicle: string
}

const DriverCard = ({ name, vehicle}: DriverProps ) => (
    <Card sx={{ maxWidth: 345, my: 2 }}>
        <CardContent>
            <Typography variant="h6">{name}</Typography>
            <Typography color="textSecondary">{vehicle}</Typography>
        </CardContent>
        <CardActions>
            <Button size="small" variant="contained" color="primary">
                Escolher
            </Button>
        </CardActions>
    </Card>
);

export default DriverCard;