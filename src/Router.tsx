import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './Pages/Home.tsx';
import Statistic from './Pages/Statistic.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Pages/Root.tsx';
import Restore from './Pages/Restore.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <App />,
            },
            {
                path: '/statistic',
                element: <Statistic />,
            },
            {
                path: '/restore',
                element: <Restore />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
