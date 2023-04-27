import { useRoutes } from 'react-router-dom';
import routes from '@/router';
import './App.less';
import ScrollTop from '@/compontents/scrollTop';
import ThemeCustomization from '@/themes';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { CodeOutlined, PlusOutlined } from '@ant-design/icons';
function App() {
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        window.addEventListener('unhandledrejection', async (e) => {
            enqueueSnackbar({
                message: e.reason.message,
                variant: 'error',
                // 控制弹窗的位置
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                // 控制弹窗的动画
                transitionDuration: {
                    enter: 300,
                    exit: 1000,
                },
                // 控制弹窗的样式
                // style: {
                //     backgroundColor: 'red',
                //     color: 'white',
                // },
                // 控制弹窗自动关闭的时间
                autoHideDuration: 2000,
            });
        });
        return () => {
            window.removeEventListener('unhandledrejection', () => {
                console.log('移除了');
            });
        };
    }, [enqueueSnackbar]);
    const actions = [{ icon: <CodeOutlined />, name: '设置你的openAI_KEY' }];

    return (
        <>
            <div className="App">
                <ThemeCustomization>
                    <ScrollTop>{useRoutes(routes)}</ScrollTop>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                        icon={<PlusOutlined />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => {
                                    console.log('点击了');
                                }}
                            />
                        ))}
                    </SpeedDial>
                </ThemeCustomization>
            </div>
        </>
    );
}

export default App;
