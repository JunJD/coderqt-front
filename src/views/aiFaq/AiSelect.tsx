import React from 'react';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { BuildFilled, MediumOutlined, PlayCircleOutlined, RobotFilled, SecurityScanFilled } from '@ant-design/icons';

const AiSelect = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    
    const OptionsItem = [
        {
            icon: <PlayCircleOutlined />,
            text: '休闲聊天',
        },
        {
            icon: <BuildFilled />,
            text: '代码助理',
        },
        {
            icon: <MediumOutlined />,
            text: '编辑助理',
        },
        {
            icon: <RobotFilled />,
            text: '提示优化器',
        },
        {
            icon: <SecurityScanFilled />,
            text: '翻译助理',
        },
    ]
    
    return (
        <List component="nav" aria-label="secondary mailbox folder">
            {OptionsItem.map((item, index) => (
                <ListItemButton
                    key={item.text + index}
                    sx={{
                        borderRadius: '10px',
                        color: 'secondary.main',
                        '&.Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                        },
                    }}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                >
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default AiSelect;
