import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import App from './App';

// 样式
import 'normalize.css';
import './assets/css/index.less';

const Inspect = React.lazy(() => import('inspx'));

const defaulttheme = {
    color: {
        primary: '#1890ff',
        secondary: '#f5222d',
        success: '#52c41a',
        warning: '#faad14',
    },
    breakpoints: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1266,
        xl: 1536,
    },
    // ...
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <RecoilRoot>
            <Inspect disabled={import.meta.env.MODE === 'production'}>
                <ThemeProvider theme={defaulttheme}>
                    <App />
                </ThemeProvider>
            </Inspect>
        </RecoilRoot>
    </BrowserRouter>,
);
