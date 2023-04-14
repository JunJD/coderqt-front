import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import Contexify from '@/views/contexify';
import Login from '@/auth/login';

// 懒加载一级路由

const Main = lazy(() => import('@/views/main'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/login"></Navigate>,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/main',
        element: <Main></Main>,
        children: [
            {
                path: '/main/contexify',
                element: <Contexify></Contexify>,
            },
        ],
    },
];

export default routes;