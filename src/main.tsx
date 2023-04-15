import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/index.less';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@/context/themeContext';
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
            <Inspect
                disabled={
                    process.env.NODE_ENV === 'staging' ||
                    process.env.NODE_ENV === 'production'
                }
            >
                <ThemeProvider defaulttheme={defaulttheme}>
                    <App />
                </ThemeProvider>
            </Inspect>
        </RecoilRoot>
    </BrowserRouter>,
);
