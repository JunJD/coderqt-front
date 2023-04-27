// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const DrawerHeaderStyled = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: open ? 'flex-start' : 'center',
    paddingLeft: theme.spacing(open ? 3 : 0),
    boxShadow: theme.customShadows.barScrollTopShadow,
    transition: theme.transitions.create('box-shadow', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    // 当下方有重叠的时候，有card效果
    // zIndex: 999,
    // transition: theme.transitions.create('padding', {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    // }),

    // '& > *': {
    //     transition: theme.transitions.create('opacity', {
    //         easing: theme.transitions.easing.easeInOut,
    //         duration: theme.transitions.duration.shorter,
    //     }),
    //     opacity: open ? 1 : 0,
    // },

    // '&:hover': {
    //     '& > *': { opacity: 1 },
    // },
}));

export default DrawerHeaderStyled;
