import { useRoutes } from 'react-router-dom';
import routes from '@/router';
import './App.less';
import ScrollTop from '@/compontents/scrollTop';
import ThemeCustomization from '@/themes';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
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
                autoHideDuration: 1000,
            });
        });
        return () => {
            window.removeEventListener('unhandledrejection', () => {
                console.log('移除了');
            });
        }
    }, [enqueueSnackbar]);

    return (
        <>
            <div className="App">
                <ThemeCustomization>
                    <ScrollTop>{useRoutes(routes)}</ScrollTop>
                </ThemeCustomization>
            </div>
        </>
    );
}

export default App;
