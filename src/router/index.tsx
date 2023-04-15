import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import Contexify from '@/views/contexify';
import Login from '@/auth/pages/LoginPage';
import LandingPage from '@/auth/pages/LandingPage';
import Register from '@/auth/pages/RegisterPage';
// 懒加载一级路由

const Main = lazy(() => import('@/layout/main'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/landingpage"></Navigate>,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/landingpage',
        element: <LandingPage />,
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
