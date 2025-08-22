// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '@/lib/authService';

const ProtectedRoute = () => {
    if (!isAuthenticated()) {
        // Se não estiver autenticado, redireciona para a página de login
        return <Navigate to="/login" />;
    }

    // Se estiver autenticado, renderiza a página solicitada
    return <Outlet />;
};

export default ProtectedRoute;