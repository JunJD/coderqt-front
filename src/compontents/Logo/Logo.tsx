// material-ui
// assets
import Lottie from '@/compontents/lottie';
import JSONData from '@/../public/137299-code-or-terminal.json';

import { Avatar, Stack, Typography } from '@mui/material';
import config from '@/config';

const Logo = () => {
    // const theme = useTheme();

    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ p: 2 }}
            >
                <Avatar
                    alt="profile user"
                    sx={{ width: 42, height: 42 }}
                    variant="rounded"
                >
                    <Lottie animationData={JSONData} height={112} width={112} />
                </Avatar>
                <Typography variant="subtitle1">{config.title}</Typography>
            </Stack>
        </>
    );
};

export default Logo;
