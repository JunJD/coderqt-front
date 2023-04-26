import React from 'react';
import {
    Grid,
    useTheme,
} from '@mui/material';
// import {
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
//     Typography,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AiSearch from './AiSearch';
import AiSelect from './AiSelect';
import ChatComponent from './ChatComponent';
// styles
// const IFrameWrapper = styled('iframe')(() => ({
//     height: 'calc(100vh - 210px)',
//     border: 'none',
// }));

const AiFaq = () => {

    const theme = useTheme();
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <AiSearch />
            </Grid>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    <Grid item xs={12} md={3} sx={{ mb: -2.25 }}>
                        <AiSelect />
                    </Grid>
                    <Grid item xs={12} md={9} sx={{ mb: -2.25 }}>
                        <ChatComponent />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AiFaq;
