import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
} from '@mui/material';

// project import
import MainCard from './../../../compontents/MainCard';
import Transitions from '@/compontents/@extended/Transitions';

// assets
import {
    BellOutlined,
    CloseOutlined,
    GiftOutlined,
    MessageOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import React from 'react';

// sx styles
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem',
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none',
};

const Notification = () => {
    const [notificationQueue, setNotification] = useState([
        {
            id: 1,
            type: 'success',
            title: '新订单已收到',
            subtitle: '1小时前',
            icon: <GiftOutlined />,
            secondary: 'Nike Air Max 270',
        },
        {
            id: 2,
            type: 'warning',
            title: '新消息',
            subtitle: '2小时前',
            icon: <MessageOutlined />,
            secondary: '来自约翰·多伊的：你好，今天晚上有...',
        },
        {
            id: 3,
            type: 'error',
            title: '您的物品已发货',
            subtitle: '5小时前',
            icon: <SettingOutlined />,
            secondary: 'Nike air max 270',
        },
        {
            id: 4,
            type: 'primary',
            title: '新订单已收到',
            subtitle: '1天前',
            icon: <GiftOutlined />,
            secondary: 'Nike classic cortez',
        },
    ]);
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const anchorRef = useRef<any>(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                disableRipple
                color="secondary"
                sx={{
                    color: 'text.primary',
                    bgcolor: open ? iconBackColorOpen : iconBackColor,
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Badge badgeContent={4} color="primary">
                    <BellOutlined />
                </Badge>
            </IconButton>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? -5 : 0, 9],
                            },
                        },
                    ],
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                boxShadow: theme.shadows[3],
                                width: '100%',
                                minWidth: 285,
                                maxWidth: 420,
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: 285,
                                },
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    title="消息队列"
                                    elevation={0}
                                    border={false}
                                    content={false}
                                    secondary={
                                        <IconButton
                                            size="small"
                                            onClick={handleToggle}
                                        >
                                            <CloseOutlined />
                                        </IconButton>
                                    }
                                >
                                    <List
                                        component="nav"
                                        sx={{
                                            p: 0,
                                            '& .MuiListItemButton-root': {
                                                py: 0.5,
                                                '& .MuiAvatar-root': avatarSX,
                                                '& .MuiListItemSecondaryAction-root':
                                                    {
                                                        ...actionSX,
                                                        position: 'relative',
                                                    },
                                            },
                                        }}
                                    >
                                        {notificationQueue.map((item) => (
                                            <React.Fragment key={item.id}>
                                                <ListItemButton>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            sx={{
                                                                color: `${item.type}.main`,
                                                                bgcolor: `${item.type}.lighter`,
                                                            }}
                                                        >
                                                            {item.icon}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="h6">
                                                                {item.title}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            item.secondary
                                                        }
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Typography
                                                            variant="caption"
                                                            noWrap
                                                        >
                                                            {item.subtitle}
                                                        </Typography>
                                                    </ListItemSecondaryAction>
                                                </ListItemButton>
                                                <Divider />
                                            </React.Fragment>
                                        ))}
                                        <ListItemButton
                                            sx={{
                                                textAlign: 'center',
                                                py: `${12}px !important`,
                                            }}
                                        >
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        variant="h6"
                                                        color="primary"
                                                    >
                                                        查看所有
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Notification;
