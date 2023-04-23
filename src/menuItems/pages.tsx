// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { IMenuItem } from '.';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
};

const pages: IMenuItem = {
    id: 'authentication',
    title: '身份验证',
    type: 'group',
    children: [
        {
            id: 'login',
            title: 'Login',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            target: true,
        },
        {
            id: 'register',
            title: 'Register',
            type: 'item',
            url: '/register',
            icon: icons.ProfileOutlined,
            target: true,
        },
    ],
};

export default pages;
