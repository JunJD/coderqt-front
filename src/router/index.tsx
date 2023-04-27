import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import MainLayout from '@/layout/index';
import Login from '@/auth/pages/LoginPage';
import LandingPage from '@/auth/pages/LandingPage';
import Register from '@/auth/pages/RegisterPage';
import Dashboard from '@/views/dashboard';
import Loadable from '@/compontents/Loadable';
// import config from '@/config';
// 懒加载一级路由
const Contexify = Loadable(lazy(() => import('@/views/contexify')));
const UploadResume = Loadable(
    lazy(() => import('@/views/uploadResume/pdfEditor')),
);
const AiFaq = Loadable(lazy(() => import('@/views/aiFaq')));
const Scheduler = Loadable(lazy(() => import('@/views/scheduler')));

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
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/main/dashboard',
                element: <Dashboard></Dashboard>,
            },
            {
                path: '/main/contexify',
                element: <Contexify></Contexify>,
            },
            {
                path: '/main/pdfEditor',
                element: <UploadResume />,
            },
            {
                path: '/main/aiFaq',
                element: <AiFaq />,
            },
            {
                path: '/main/scheduler',
                element: <Scheduler />,
            },
        ],
    },
];

export default routes;
