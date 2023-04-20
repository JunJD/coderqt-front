// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// 监测设备类型
import { BrowserView, MobileView } from 'react-device-detect';
import { FC } from 'react';

// root style
const RootStyle = styled(BrowserView)({
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
    // 重写滚动条样式
    '&::-webkit-scrollbar': {
        width: 8,
        height: 8,
        backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        borderRadius: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.48)',
    },
    '&::-webkit-scrollbar-track': {
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
