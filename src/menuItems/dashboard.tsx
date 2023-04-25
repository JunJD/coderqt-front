// assets
import { LaptopOutlined } from '@ant-design/icons';
import { IMenuItem } from '.';

// icons
const icons = {
    LaptopOutlined,
};

const dashboard: IMenuItem = {
    id: 'group-dashboard',
    title: '导航',
    type: 'group',
    children: [
        {
            id: '/main/dashboard',
            title: '首页',
            type: 'item',
            url: '/main/dashboard',
            icon: icons.LaptopOutlined,
            breadcrumbs: false,
        },
        {
            id: '/main/aiFaq',
            title: 'AIFAQ',
            type: 'item',
            url: '/main/aiFaq',
            icon: icons.LaptopOutlined,
        },
    ],
};

export default dashboard;
