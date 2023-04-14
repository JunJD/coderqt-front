import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu,
    TriggerEvent,
} from 'react-contexify';
import 'react-contexify/ReactContexify.css';

const MENU_ID = 'blahblah';

function Contexify() {
    // 这个函数是用来显示菜单的
    // 它传入一个对象，对象里面有两个属性，一个是event，一个是props，event是鼠标事件，
    // props是自定义的属性，id是菜单的id，onClick是点击菜单项的回调函数
    // 它返回一个对象，对象里面有一个属性show，这个属性是一个函数，
    // 这个函数传入一个对象，对象里面有两个属性，一个是event，一个是props，event是鼠标事件，props是自定义的属性
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
                lorem ipsum blabladhasi blaghs blah
            </p>
            <Menu id={MENU_ID}>
                <Item id="copy" onClick={handleItemClick}>
                    Copy
                </Item>
                <Item id="cut" onClick={handleItemClick}>
                    Cut
                </Item>
                <Separator />
                <Item disabled>Disabled</Item>
                <Separator />
                <Submenu label="Foobar">
                    <Item id="reload" onClick={handleItemClick}>
                        Reload
                    </Item>
                    <Item id="something" onClick={handleItemClick}>
                        Do something else
                    </Item>
                </Submenu>
            </Menu>
        </div>
    );
}

export default Contexify;
