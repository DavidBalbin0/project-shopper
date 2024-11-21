// src/components/DriverList.tsx
import React from 'react';
import { Grid } from '@mui/material';
import DriverCard from './DriverCard';

const DriverList = () => {
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
                <DriverCard name="João Silva" vehicle="Toyota Corolla" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <DriverCard name="Maria Souza" vehicle="Honda Civic" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <DriverCard name="Carlos Pereira" vehicle="Chevrolet Onix" />
            </Grid>
        </Grid>
    );
};

export default DriverList;
