// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { FC } from 'react';

interface DotProps {
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    size?: number;
}

const Dot: FC<DotProps> = ({ color, size }) => {
    const theme = useTheme();
    let main;
    switch (color) {
        case 'secondary':
            main = theme.palette.secondary.main;
            break;
        case 'error':
            main = theme.palette.error.main;
            break;
        case 'warning':
            main = theme.palette.warning.main;
            break;
        case 'info':
            main = theme.palette.info.main;
            break;
        case 'success':
            main = theme.palette.success.main;
            break;
        case 'primary':
        default:
            main = theme.palette.primary.main;
    }

    return (
        <Box
            sx={{
                width: size || 8,
                height: size || 8,
                borderRadius: '50%',
                bgcolor: main,
            }}
        />
    );
};

export default Dot;
