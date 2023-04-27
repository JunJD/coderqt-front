// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { IMenuItem } from '.';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
};

const utilities: IMenuItem = {
    id: 'utilities',
    title: '实用工具',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'TODO与AI',
            type: 'item',
            url: '/main/contexify',
            icon: icons.FontSizeOutlined,
        },
        {
            id: 'util-color',
            title: '卡路里与AI',
            type: 'item',
            url: '/main/contexify',
            icon: icons.BgColorsOutlined,
        },
    ],
};

export default utilities;
