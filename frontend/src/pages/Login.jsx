import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoMdFootball } from 'react-icons/io';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import Toast from '../components/Toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState(null);
    const { login, loading } = useAuthStore();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await login(formData.email, formData.password);
            setToast({ message: 'Login successful! Welcome back.', type: 'success' });
            setTimeout(() => navigate('/profile'), 1500);
        } catch (error) {
            setToast({ message: error.response?.data?.message || 'Login failed', type: 'error' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700 p-8 transform transition-all hover:scale-[1.01]">
                <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-full bg-slate-700/50 mb-4 animate-bounce-slow">
                        <IoMdFootball className="w-12 h-12 text-pitch-green" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-slate-400 mt-2">Login to manage your squad</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-slate-500 group-focus-within:text-pitch-green transition-colors" />
                            </div>
                            <input
                                type="email"
                                className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border rounded-xl focus:ring-2 focus:ring-pitch-green focus:border-transparent outline-none transition-all duration-200 text-white placeholder-slate-500 ${errors.email ? 'border-red-500' : 'border-slate-700 hover:border-slate-600'
                                    }`}
                                placeholder="coach@team.com"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                    if (errors.email) setErrors({ ...errors, email: null });
                                }}
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-500 animate-pulse">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-slate-500 group-focus-within:text-pitch-green transition-colors" />
                            </div>
                            <input
                                type="password"
                                className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border rounded-xl focus:ring-2 focus:ring-pitch-green focus:border-transparent outline-none transition-all duration-200 text-white placeholder-slate-500 ${errors.password ? 'border-red-500' : 'border-slate-700 hover:border-slate-600'
                                    }`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value });
                                    if (errors.password) setErrors({ ...errors, password: null });
                                }}
                            />
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-500 animate-pulse">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-pitch-green to-emerald-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transform transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Authenticating...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <p className="text-center mt-6 text-slate-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-pitch-green font-semibold hover:text-emerald-400 transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>

            {/* Background Decorations */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pitch-green/20 rounded-full blur-[100px]" />
            </div>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default Login;
