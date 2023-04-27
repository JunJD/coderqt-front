import MainCard from '@/compontents/MainCard';
import { useTheme } from '@mui/material';
import React from 'react';

import DemoApp from './DemoApp';
const Scheduler = () => {
    const theme = useTheme()
    
    return (
        <MainCard
            sx={{
                boxShadow: theme.shadows[1],
            }}
        >
            <DemoApp />
        </MainCard>
    );
};

export default Scheduler;
