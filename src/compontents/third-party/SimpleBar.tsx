// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// 监测设备类型
import { BrowserView, MobileView } from 'react-device-detect';
import { FC } from 'react';

// BrowserView: 电脑端
const RootStyle = styled(BrowserView)({
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
    // 重写滚动条样式,hover时显示
    '&::-webkit-scrollbar': {
        width: 0,
        height: 0,
    },
    '&:hover::-webkit-scrollbar': {
        width: 6,
        height: 6,
        backgroundColor: 'transparent',
    },
    '&:hover::-webkit-scrollbar-thumb': {
        borderRadius: 4,
        // 浅色
        backgroundColor: 'rgba(0, 0, 0, 0.24)',
    },
    '&:hover::-webkit-scrollbar-track': {
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
});

interface SimpleBarScrollProps {
    children: React.ReactNode;
    sx: object;
}

const SimpleBarScroll: FC<SimpleBarScrollProps> = ({
    children,
    sx,
    ...other
}) => {
    return (
        <>
            <RootStyle>{children}</RootStyle>
            <MobileView>
                <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
                    {children}
                </Box>
            </MobileView>
        </>
    );
};

export default SimpleBarScroll;
