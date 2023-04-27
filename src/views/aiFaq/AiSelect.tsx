import React, { FC } from 'react';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import OptionsItem, { OptionsItemType } from './config/optionsItem';

interface AiSelectProps {
    selectedItem: OptionsItemType;
    onChange: (OptionsItem: OptionsItemType) => void;
}

const AiSelect: FC<AiSelectProps> = (props) => {
    const { selectedItem, onChange } = props;


    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        OptionsItem: OptionsItemType,
    ) => {
        onChange(OptionsItem);
    };
    
    return (
        <List component="nav" aria-label="secondary mailbox folder">
            {OptionsItem.map(item => (
                <ListItemButton
                    key={item.key}
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
                    selected={selectedItem.key === item.key}
                    onClick={(event) => handleListItemClick(event, item)}
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
