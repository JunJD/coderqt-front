// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// 监测设备类型，电脑端和移动端的滚动条样式不同
import { BrowserView, MobileView } from 'react-device-detect';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { mainStore } from '@/store/main';

// 电脑端组件，重写滚动条样式
// styled(BrowserView)({})，BrowserView是一个组件，{ } 是一个对象，对象里面是css样式，返回一个组件
const RootStyle = styled(BrowserView)(({ theme }) => ({
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        width: 6,
        height: 6,
        backgroundColor: 'transparent',
        '-webkit-transition': 'all .5s ease-in-out',
        transition: 'all .5s ease-in-out',
    },
    '&:hover::-webkit-scrollbar-thumb': {
        borderRadius: 4,
        // 浅色
        backgroundColor: theme.palette.action.hover,
    },
    '&::-webkit-scrollbar-track': {
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
}));

interface SimpleBarScrollProps {
    children: React.ReactNode;
    sx: object;
}

const SimpleBarScroll: FC<SimpleBarScrollProps> = ({
    children,
    sx,
    ...other
}) => {
    const [mainState, setMainState] = useRecoilState(mainStore);
    return (
        <>
            <RootStyle
                onScroll={(e: any) => {
                    setMainState({
                        ...mainState,
                        barScrollTop: e.target.scrollTop,
                    });
                }}
            >
                {children}
            </RootStyle>
            <MobileView>
                <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
                    {children}
                </Box>
            </MobileView>
        </>
    );
};

export default SimpleBarScroll;
