// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
};

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Typography',
            type: 'item',
            url: '/main/contexify',
            icon: icons.FontSizeOutlined,
        },
        {
            id: 'util-color',
            title: 'Color',
            type: 'item',
            url: '/main/contexify',
            icon: icons.BgColorsOutlined,
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/main/contexify',
            icon: icons.BarcodeOutlined,
        },
        {
            id: 'ant-icons',
            title: 'Ant Icons',
            type: 'item',
            url: '/main/contexify',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false,
        },
    ],
};

export default utilities;
