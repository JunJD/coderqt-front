// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import { FC } from 'react';
import Logo from '@/compontents/Logo';

interface DrawerHeaderProps {
    open: boolean;
}

const DrawerHeader: FC<DrawerHeaderProps> = ({ open }) => {
    const theme = useTheme();

    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Logo />
                <Chip
                    label={'0.1'}
                    size="small"
                    sx={{
                        height: 16,
                        '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 },
                    }}
                    component="a"
                    // href=""
                    target="_blank"
                    clickable
                />
            </Stack>
        </DrawerHeaderStyled>
    );
};

export default DrawerHeader;
