import { FC, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';
import { drawerWidth } from './../../config';

interface MainDrawerProps {
    open: boolean;
    handleDrawerToggle: () => void;
    window?: () => Window;
}

const MainDrawer: FC<MainDrawerProps> = ({
    open,
    handleDrawerToggle,
    window,
}) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    // responsive drawer container
    const container =
        window !== undefined ? () => window().document.body : undefined;

    // header content
    const drawerContent = useMemo(() => <DrawerContent />, []);
    const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

    return (
        <Box
            component="nav"
            sx={{ flexShrink: { md: 0 }, zIndex: 1300 }}
            aria-label="coderQT folders"
        >
            {/* 当屏幕宽度小于lg时，使用MiniDrawerStyled，否则使用Drawer */}
            {!matchDownMD ? (
                <MiniDrawerStyled variant="permanent" open={open}>
                    {drawerHeader}
                    {drawerContent}
                </MiniDrawerStyled>
            ) : (
                <Drawer
                    open={open}
                    // container是一个material-ui的属性，作用是将Drawer组件挂载到指定的DOM节点上,默认是挂载到body上
                    container={container}
                    // temporary是一个material-ui的属性，作用是临时抽屉，当open为true时，抽屉显示，当open为false时，抽屉隐藏
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    onClose={handleDrawerToggle}
                    // keepMounted是一个material-ui的属性，作用是当抽屉关闭时，是否保持DOM节点
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        // 当屏幕宽度小于lg时，隐藏Drawer组件
                        display: { xs: 'block', lg: 'none' },
                        // & 是设置子元素MuiDrawer-paper的样式
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: `1px solid ${theme.palette.divider}`,
                            backgroundImage: 'none',
                            boxShadow: 'inherit',
                        },
                    }}
                >
                    {open && drawerHeader}
                    {open && drawerContent}
                </Drawer>
            )}
        </Box>
    );
};

export default MainDrawer;
