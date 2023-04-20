// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
};

const support = {
    id: 'support',
    title: 'Support',
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
            url: 'www.baidu.com',
            icon: icons.QuestionOutlined,
            external: true,
            target: true,
        },
    ],
};

export default support;
