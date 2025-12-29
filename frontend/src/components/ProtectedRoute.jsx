import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, user, fetchCurrentUser } = useAuthStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated && !user) {
            fetchCurrentUser().finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, user, fetchCurrentUser]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user?.role !== 'admin') {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default ProtectedRoute;
