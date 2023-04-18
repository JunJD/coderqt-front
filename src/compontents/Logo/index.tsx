import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Theme, SxProps } from '@mui/material';

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
    </ButtonBase>
);

export default LogoSection;
