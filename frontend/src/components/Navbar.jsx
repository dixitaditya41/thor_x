import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { IoMdFootball } from 'react-icons/io';
import useAuthStore from '../store/authStore';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-pitch-green to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-pitch-green/30 transition-all">
                            <IoMdFootball className="text-xl text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">User Manager</span>
                    </Link>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        {/* Navigation Links */}
                        {user?.role === 'admin' && (
                            <Link
                                to="/admin"
                                className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all flex items-center gap-2 text-sm font-medium"
                            >
                                <FaUsers className="text-pitch-green" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                        )}

                        <Link
                            to="/profile"
                            className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all flex items-center gap-2 text-sm font-medium"
                        >
                            <FaUserCircle className="text-pitch-green" />
                            <span className="hidden sm:inline">Profile</span>
                        </Link>

                        {/* User Info */}
                        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            <div className="text-right">
                                <div className="text-sm font-semibold text-white">{user?.fullName}</div>
                                <div className="text-xs text-slate-400 capitalize">{user?.role}</div>
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 rounded-lg transition-all flex items-center gap-2 text-sm font-medium"
                        >
                            <FaSignOutAlt />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
