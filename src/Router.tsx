import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Pages/Home.tsx';
import Statistic from './Pages/Statistic.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Pages/Root.tsx';
import Restore from './Pages/Restore.tsx';
import TestApi from './Pages/TestApi.tsx';
import Auth from './Pages/Auth.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/statistic',
                element: <Statistic />,
            },
            {
                path: '/restore',
                element: <Restore />,
            },
            {
                path: '/test',
                element: <TestApi />,
            },
        ],
    },
    {
        path: '/auth',
        element: <Auth />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
