// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AppBar,
    AppBarTypeMap,
    IconButton,
    Toolbar,
    useMediaQuery,
} from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FC } from 'react';

interface HeaderProps {
    open: boolean;
    handleDrawerToggle: () => void;
}

const Header: FC<HeaderProps> = ({ open, handleDrawerToggle }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const iconBackColor = 'grey.100';
    const iconBackColorOpen = 'grey.200';

    // common header
    const mainHeader = (
        <Toolbar>
            <IconButton
                disableRipple
                aria-label="打开菜单"
                onClick={handleDrawerToggle}
                // edge="start"是指按钮在左边
                edge="start"
                // sx是指样式
                sx={{
                    color: 'text.primary',
                    bgcolor: open ? iconBackColorOpen : iconBackColor,
                    // ml: { xs: 0, lg: -2 }是指margin-left: 0, lg是指大于lg的屏幕
                    ml: { xs: 0, lg: -2 },
                }}
            >
                {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </IconButton>
            <HeaderContent />
        </Toolbar>
    );

    // app-bar params
    const appBar: AppBarTypeMap['props'] = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    };

    return (
        <>
            {!matchDownMD ? (
                <AppBarStyled open={open} {...appBar}>
                    {mainHeader}
                </AppBarStyled>
            ) : (
                <AppBar {...appBar}>{mainHeader}</AppBar>
            )}
        </>
    );
};

export default Header;
