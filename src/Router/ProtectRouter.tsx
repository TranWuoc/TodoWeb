import { Navigate } from 'react-router-dom';

export const ProtectRouter = ({ children }: { children: React.ReactElement }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/auth" replace />;
};
