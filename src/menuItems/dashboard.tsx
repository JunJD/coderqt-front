// assets
import { DashboardOutlined } from '@ant-design/icons';
import { IMenuItem } from '.';

// icons
const icons = {
    DashboardOutlined,
};

const dashboard: IMenuItem = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/main/pdfEditor',
            icon: icons.DashboardOutlined,
            breadcrumbs: false,
        },
    ],
};

export default dashboard;
