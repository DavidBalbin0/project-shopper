// src/components/DriverList.tsx
import React from 'react';
import { Grid } from '@mui/material';
import DriverCard from './DriverCard';
import {Driver} from "../models/models";

interface DriverListProps {
    drivers: Driver[];
}

const DriverList: React.FC<DriverListProps> = ({ drivers }) => {
    return (
        <Grid container spacing={2} justifyContent="center">
            {drivers.map(driver => (
                <Grid item xs={12} sm={6} md={4} key={driver.id}>
                    <DriverCard
                        name={driver.name}
                        vehicle={driver.vehicle}
                        description={driver.description}
                        rating={driver.review.rating}
                        review={driver.review.comment}
                        value={driver.value}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default DriverList;
