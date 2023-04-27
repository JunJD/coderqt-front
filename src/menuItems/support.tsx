// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { IMenuItem } from '.';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
};

const support: IMenuItem = {
    id: 'support',
    title: '测试页面',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/main/contexify',
            icon: icons.ChromeOutlined,
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://www.baidu.com',
            icon: icons.QuestionOutlined,
            external: true,
            target: true,
        },
        {
            id: 'collapse-page',
            title: 'collapse Page',
            type: 'collapse',
            icon: icons.ChromeOutlined,
            children: [
                {
                    id: 'collapse-page-1',
                    title: 'Sample Page',
                    type: 'item',
                    url: '/main/contexify',
                    icon: icons.ChromeOutlined,
                },
                {
                    id: 'collapse-2',
                    title: 'collapse-2',
                    type: 'item',
                    url: 'https://www.baidu.com',
                    icon: icons.QuestionOutlined,
                    external: true,
                    target: true,
                },
            ],
        },
    ],
};

export default support;
