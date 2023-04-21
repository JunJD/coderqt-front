// material-ui
import { Box, List, Typography } from '@mui/material';

// project import
import NavItem from './NavItem';
import { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { menuStore } from '@/store/menu';
import { IMenuItem } from '@/menuItems';
import React from 'react';
import NestedList from './NestedList';

const NavGroup: FC<{ item: IMenuItem }> = ({ item }) => {
    // 全局维护菜单状态
    const menu = useRecoilValue(menuStore);
    const drawerOpen = useMemo(() => menu.drawerOpen, [menu.drawerOpen]);
    const [iscollapseId, setIscollapseId] = React.useState<string[]>([]);
    const handleIscollapseIds = (childrenId: IMenuItem['id']) => {
        if (iscollapseId.some((id) => id === childrenId)) {
            setIscollapseId(iscollapseId.filter((id) => id !== childrenId));
        } else {
            setIscollapseId([...iscollapseId, childrenId]);
        }
    };

    // navCollapse 用于递归渲染子菜单
    const navCollapse = (item: IMenuItem, level: number): React.ReactNode => {
        return item.children?.map((menuItem: IMenuItem) => {
            switch (menuItem.type) {
                case 'collapse':
                    return (
                        <NestedList
                            key={menuItem.id}
                            drawerOpen={drawerOpen}
                            childrenItem={menuItem}
                            handleIscollapseIds={handleIscollapseIds}
                            iscollapse={iscollapseId.some(
                                (id) => id === menuItem.id,
                            )}
                        >
                            {navCollapse(menuItem, level + 1)}
                        </NestedList>
                    );
                case 'item':
                    return (
                        <NavItem
                            key={menuItem.id}
                            item={menuItem}
                            level={level}
                        />
                    );
                default:
                    return (
                        <Typography
                            key={menuItem.id}
                            variant="h6"
                            color="error"
                            align="center"
                        >
                            Fix - Group Collapse or Items
                        </Typography>
                    );
            }
        });
    };
    return (
        <List
            subheader={
                item.title &&
                drawerOpen && (
                    <Box sx={{ pl: 3, mb: 1.5 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            {item.title}
                        </Typography>
                        {/* only available in paid version */}
                    </Box>
                )
            }
            sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
            {navCollapse(item, 1)}
        </List>
    );
};

export default NavGroup;
