import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from '../Pages/Home.tsx';
import Statistic from '../Pages/Statistic.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '../Pages/Root.tsx';
import Restore from '../Pages/Restore.tsx';
import TestApi from '../Pages/TestApi.tsx';
import Auth from '../Pages/Auth.tsx';
import { ProtectRouter } from './ProtectRouter.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectRouter>
                <Root />
            </ProtectRouter>
        ),
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
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>,
);
