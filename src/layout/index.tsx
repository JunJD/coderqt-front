import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
// import navigation from 'menu-items';
// import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { menuStore } from '@/store/menu';
import { useRecoilState } from 'recoil';

const MainLayout = () => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));

    const [menu, setMenu] = useRecoilState(menuStore);
    const [open, setOpen] = useState(menu.drawerOpen);

    const handleDrawerToggle = () => {
        setOpen(!open);
        setMenu({ ...menu, drawerOpen: !open });
    };

    // set media wise responsive drawer
    useEffect(() => {
        setOpen(!matchDownLG);
        setMenu({ ...menu, drawerOpen: !matchDownLG });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLG]);

    useEffect(() => {
        if (open !== menu.drawerOpen) setOpen(menu.drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu.drawerOpen]);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <Box
                component="main"
                sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}
            >
                <Toolbar />
                {/* <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} /> */}
                <Outlet></Outlet>
                1
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
