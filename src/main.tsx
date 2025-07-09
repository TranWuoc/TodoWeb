import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Statistic from './Statistic.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/app',
                element: <App />,
            },
            {
                path: '/statistic',
                element: <Statistic />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
