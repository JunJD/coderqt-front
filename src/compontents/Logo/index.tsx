import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Theme, SxProps, Box } from '@mui/material';

// project import
import Logo from './Logo';
import config from '../../config';
import { FC } from 'react';

interface LogoSectionProps {
    sx?: SxProps<Theme>;
    to?: string;
}

const LogoSection: FC<LogoSectionProps> = ({ sx, to }) => (
    <ButtonBase
        disableRipple
        component={Link}
        to={!to ? config.defaultPath : to}
        sx={sx}
    >
        <Logo />
        <Box
            component="span"
            sx={{
                ml: -2,
                fontSize: '1rem',
                fontWeight: 600,
                color: 'text.primary',
                position: 'relative',
                ZIndex: 10000,
            }}
        >
            {config.title}
        </Box>
    </ButtonBase>
);

export default LogoSection;
