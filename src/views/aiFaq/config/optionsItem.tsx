import { BuildFilled, MediumOutlined, PlayCircleOutlined, RobotFilled, SecurityScanFilled } from '@ant-design/icons';
export interface OptionsItemType {
    icon?: React.ReactNode;
    text?: string;
    key: string;
}
const OptionsItem: OptionsItemType[] = [
    {
        icon: <PlayCircleOutlined />,
        text: '休闲聊天',
        key: 'casualChat',
    },
    {
        icon: <BuildFilled />,
        text: '代码助理',
        key: 'codeChat',
    },
    {
        icon: <MediumOutlined />,
        text: '编辑助理',
        key: 'editChat',
    },
    {
        icon: <RobotFilled />,
        text: '提示优化器',
        key: 'hintChat',
    },
    {
        icon: <SecurityScanFilled />,
        text: '翻译助理',
        key: 'translateChat',
    },
]

export default OptionsItem;