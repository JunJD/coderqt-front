import React, { FC, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Chip,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';

// project import
import { useRecoilState } from 'recoil';
import { menuStore } from '@/store/menu';
import { IMenuItem } from '@/menuItems';
import { CommonProps } from '@mui/material/OverridableComponent';

interface NavItemProps {
    // 注释：这里的 item 是一个 IMenuItem 类型的对象
    item: IMenuItem;
    // 注释：用于判断是否是一级菜单
    level: number;
}

const NavItem: FC<NavItemProps> = ({ item, level }) => {
    const theme = useTheme();
    const [menu, setMenu] = useRecoilState(menuStore);
    const { drawerOpen, openItem } = menu;

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        // eslint-disable-next-line react/display-name
        component: React.forwardRef((props: CommonProps, ref) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            <Link {...props} to={item.url!} ref={ref} />
        )),
    };
    if (item?.external) {
        listItemProps = {
            // eslint-disable-next-line react/display-name
            component: React.forwardRef((props: CommonProps, ref) => (
                <a {...props} href={item.url} ref={ref} target={itemTarget} />
            )),
        };
    }

    const itemHandler = (id: string) => {
        setMenu({ ...menu, openItem: [id] });
    };

    const Icon = item.icon;
    const itemIcon = useMemo(() => {
        if (item.icon) {
            return (
                <Icon
                    style={{
                        opacity: drawerOpen ? 1 : 0,
                    }}
                />
            );
        }
        return null;
    }, [item.icon, Icon, drawerOpen]);

    const isSelected = openItem.findIndex((id) => id === item.id) > -1;

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            setMenu({ ...menu, openItem: [item.id] });
        }
        // eslint-disable-next-line
    }, []);

    const textColor = 'text.primary';
    const iconSelectedColor = 'primary.main';

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            onClick={() => itemHandler(item.id)}
            selected={isSelected}
            sx={{
                zIndex: 1201,
                // pl: drawerOpen ? `${28}px` : 1.5,
                // py: !drawerOpen && level === 1 ? 1.25 : 1,
                ...(drawerOpen && {
                    '&:hover': {
                        bgcolor: 'primary.lighter',
                    },
                    '&.Mui-selected': {
                        bgcolor: 'primary.lighter',
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        color: iconSelectedColor,
                        '&:hover': {
                            color: iconSelectedColor,
                            bgcolor: 'primary.lighter',
                        },
                    },
                }),
                ...(!drawerOpen && {
                    '&:hover': {
                        bgcolor: 'transparent',
                    },
                    '&.Mui-selected': {
                        '&:hover': {
                            bgcolor: 'transparent',
                        },
                        bgcolor: 'transparent',
                    },
                }),
            }}
        >
            {itemIcon && (
                <ListItemIcon
                    sx={{
                        minWidth: 28,
                        color: isSelected ? iconSelectedColor : textColor,
                        ...(!drawerOpen && {
                            borderRadius: 1.5,
                            width: 36,
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'secondary.lighter',
                            },
                        }),
                        ...(!drawerOpen &&
                            isSelected && {
                                bgcolor: 'primary.lighter',
                                '&:hover': {
                                    bgcolor: 'primary.lighter',
                                },
                            }),
                    }}
                >
                    {itemIcon}
                </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
                <ListItemText
                    primary={
                        <Typography
                            variant="h6"
                            sx={{
                                color: isSelected
                                    ? iconSelectedColor
                                    : textColor,
                            }}
                        >
                            {item.title}
                        </Typography>
                    }
                />
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={
                        item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>
                    }
                />
            )}
        </ListItemButton>
    );
};

export default NavItem;
