import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';
import App from './App';

// 样式
import 'normalize.css';
import './assets/css/index.less';

const Inspect = React.lazy(() => import('inspx'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <RecoilRoot>
            <Inspect disabled={import.meta.env.MODE === 'production'}>
                <SnackbarProvider maxSnack={3}>
                    <App />
                </SnackbarProvider>
            </Inspect>
        </RecoilRoot>
    </BrowserRouter>,
);
