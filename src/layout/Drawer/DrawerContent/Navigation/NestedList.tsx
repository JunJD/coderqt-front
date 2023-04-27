import { IMenuItem } from '@/menuItems';
import { RightOutlined } from '@ant-design/icons';
import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import React, { FC } from 'react';

interface NestedListProps {
    childrenItem: IMenuItem;
    children: React.ReactNode;
    drawerOpen: boolean;
    iscollapse: boolean;
    handleIscollapseIds: (item: IMenuItem['id']) => void;
}

const NestedList: FC<NestedListProps> = (props) => {
    const {
        childrenItem,
        children,
        drawerOpen,
        iscollapse,
        handleIscollapseIds,
    } = props;

    const Icon = childrenItem.icon;
    const itemIcon = childrenItem.icon ? (
        <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} />
    ) : (
        false
    );

    return (
        <>
            <ListItemButton
                onClick={() => {
                    handleIscollapseIds(childrenItem.id);
                }}
            >
                {itemIcon && (
                    <ListItemIcon
                        sx={{
                            minWidth: 28,
                            color: 'text.primary',
                            ...(!drawerOpen && {
                                borderRadius: 1.5,
                                width: 36,
                                height: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }),
                        }}
                    >
                        {itemIcon}
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={
                        <Typography variant="h6">
                            {childrenItem.title}
                        </Typography>
                    }
                />
                <RightOutlined
                    style={{
                        transform: iscollapse
                            ? 'rotate(0deg)'
                            : 'rotate(90deg)',
                        transition: 'all 0.3s ease',
                        fontSize: '.8rem',
                    }}
                />
            </ListItemButton>
            <Collapse in={iscollapse} timeout="auto" unmountOnExit>
                <List
                    component="nav"
                    sx={{
                        mb: drawerOpen ? 1.5 : 0,
                        py: 0,
                        zIndex: 0,
                    }}
                >
                    {children}
                </List>
            </Collapse>
        </>
    );
};

export default NestedList;
