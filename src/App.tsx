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
        // 监听onerror事件，这个是全局捕获js异常
        // window.addEventListener('error', (e) => {
        //     console.log('error', e);
        //     enqueueSnackbar('error', { variant: 'error' });
        // });
        // 监听onunhandledrejection事件，这个是全局捕获promise异常
        window.addEventListener('unhandledrejection',async (e) => {
            console.log('unhandledrejection', e.timeStamp);
            enqueueSnackbar('1'
                , { variant: 'error' });
        });
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
