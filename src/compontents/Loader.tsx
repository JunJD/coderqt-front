// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2001,
    width: '100%',
    '& > * + *': {
        marginTop: theme.spacing(2),
    },
}));

// 这个组件是用来显示加载动画的，当页面加载时，会显示这个组件
const Loader = () => (
    <LoaderWrapper>
        <LinearProgress color="primary" />
    </LoaderWrapper>
);

export default Loader;
