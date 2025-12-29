import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './store/authStore';
import './index.css';

function App() {
    const { isAuthenticated } = useAuthStore();

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/profile" />} />
                <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/profile" />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <UserProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="/" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;
