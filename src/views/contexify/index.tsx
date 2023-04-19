import { authStore } from '@/store/auth';
// import { useTheme } from '@mui/material/styles';
import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu,
    TriggerEvent,
} from 'react-contexify';

import 'react-contexify/ReactContexify.css';
import { useRecoilValue } from 'recoil';

const MENU_ID = 'blahblah';

function Contexify() {
    // 这个函数是用来显示菜单的
    // 它传入一个对象，对象里面有两个属性，一个是event，一个是props，event是鼠标事件，
    // props是自定义的属性，id是菜单的id，onClick是点击菜单项的回调函数
    // 它返回一个对象，对象里面有一个属性show，这个属性是一个函数，
    // 这个函数传入一个对象，对象里面有两个属性，一个是event，一个是props，event是鼠标事件，props是自定义的属性
    // const theme = useTheme();

    const auth = useRecoilValue(authStore);

    const { show } = useContextMenu({
        id: MENU_ID,
    });

    function handleContextMenu(event: TriggerEvent) {
        show({
            event,
            props: {
                key: 'value',
            },
        });
    }

    // 这个函数是用来处理点击菜单项的回调函数的,它传入一个对象，对象里面有三个属性，一个是id，一个是event，一个是props，id是菜单项的id，event是鼠标事件，props是自定义的属性
    const handleItemClick = ({ id, event, props }: any) => {
        switch (id) {
            case 'copy':
                console.log(event, props);
                break;
            case 'cut':
                console.log(event, props);
                break;
            //etc...
        }
    };

    return (
        <div>
            <p style={{ cursor: 'pointer' }} onContextMenu={handleContextMenu}>
                {auth.token}
            </p>

            <Menu id={MENU_ID}>
                <Item id="copy" onClick={handleItemClick}>
                    复制
                </Item>
                <Item id="cut" onClick={handleItemClick}>
                    剪切
                </Item>
                <Separator />
                <Item disabled>禁用</Item>
                <Separator />
                <Submenu label="二级操作">
                    <Item id="reload" onClick={handleItemClick}>
                        重新加载
                    </Item>
                    <Item id="something" onClick={handleItemClick}>
                        做点别的事
                    </Item>
                </Submenu>
            </Menu>
        </div>
    );
}

export default Contexify;
