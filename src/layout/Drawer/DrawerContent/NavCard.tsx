// material-ui
import { Button, Stack, Typography } from '@mui/material';

// project import
import MainCard from '@/compontents/MainCard';

// assets
import AnimateButton from '@/compontents/@extended/AnimateButton';
import LottieComponent from '@/compontents/lottie';
import JSONData from './../../../../public/97634-code.json';

const NavCard = () => (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
        <Stack alignItems="center" spacing={2.5}>
            <LottieComponent animationData={JSONData} width={112} />
            <Stack alignItems="center">
                <Typography variant="h5">coder-qt</Typography>
                <Typography variant="h6" color="secondary">
                    持续codeing...
                </Typography>
            </Stack>
            <AnimateButton type="scale">
                <Button variant="contained" color="success" size="small">
                    联系我
                </Button>
            </AnimateButton>
        </Stack>
    </MainCard>
);

export default NavCard;
