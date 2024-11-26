// src/components/DriverList.tsx
import React from 'react';
import { Grid, List, ListItem } from '@mui/material';
import DriverCard from './DriverCard';
import {Driver} from "../models/models";

interface DriverListProps {
    drivers: Driver[];
    handleChooseDriver: (driverId: number) => void;
}

const DriverList: React.FC<DriverListProps> = ({ drivers, handleChooseDriver }) => {
    return (
        <List>
            {drivers.map(driver => (
                <ListItem sx={{ padding: 0, paddingTop: 4}} key={driver.id}>
                    <DriverCard
                        name={driver.name}
                        vehicle={driver.vehicle}
                        description={driver.description}
                        rating={driver.review.rating}
                        review={driver.review.comment}
                        value={driver.value}
                        handleChooseDriver={() => handleChooseDriver(driver.id)}

                    />
                </ListItem>
            ))}
        </List>
    );
};

export default DriverList;
