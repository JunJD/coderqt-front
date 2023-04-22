// assets
import { LaptopOutlined } from '@ant-design/icons';
import { IMenuItem } from '.';

// icons
const icons = {
    LaptopOutlined,
};

const dashboard: IMenuItem = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/main/aiFaq',
            title: 'AIFAQ',
            type: 'item',
            url: '/main/aiFaq',
            icon: icons.LaptopOutlined,
            breadcrumbs: false,
        },
    ],
};

export default dashboard;
