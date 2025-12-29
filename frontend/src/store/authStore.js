import { create } from 'zustand';
import api from '../api/axios';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post('/api/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
            return data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Login failed', loading: false });
            throw error;
        }
    },

    signup: async (fullName, email, password) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post('/api/auth/signup', { fullName, email, password });
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
            return data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Signup failed', loading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
    },

    fetchCurrentUser: async () => {
        try {
            const { data } = await api.get('/api/auth/me');
            set({ user: data, isAuthenticated: true });
        } catch (error) {
            set({ isAuthenticated: false });
            localStorage.removeItem('token');
        }
    },

    clearError: () => set({ error: null }),
}));

export default useAuthStore;
