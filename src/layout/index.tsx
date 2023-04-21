import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from '@/menuItems';
import Breadcrumbs from '@/compontents/@extended/Breadcrumbs';

import { menuStore } from '@/store/menu';
import { useRecoilState } from 'recoil';

const MainLayout = () => {
    const theme = useTheme();
    // 宽度小于xl时，展示抽屉
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    // 全局维护菜单状态
    const [menu, setMenu] = useRecoilState(menuStore);

    const open = useMemo(() => menu.drawerOpen, [menu.drawerOpen]);

    const handleDrawerToggle = () => {
        setMenu({ ...menu, drawerOpen: !open });
    };

    // 根据屏幕宽度设置菜单状态
    useEffect(() => {
        setMenu({ ...menu, drawerOpen: !matchDownLG });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLG]);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <Box
                component="main"
                // flexGrow: 1是指flex-grow: 1, 作用是让元素占据剩余空间
                // p: { xs: 2, sm: 3 }是指padding: 8px 16px, 作用是设置内边距，xs是指小于sm的屏幕，sm是指大于sm的屏幕
                sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}
            >
                {/* toolbar是mui的组件，作用是占据一定的高度，使得内容不会被遮挡 */}
                <Toolbar />
                <Breadcrumbs
                    navigation={navigation}
                    title /*titleBottom card={false} divider={false}*/
                />
                <Outlet></Outlet>
            </Box>
        </Box>
    );
};

export default MainLayout;
