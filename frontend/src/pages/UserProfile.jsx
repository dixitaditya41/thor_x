import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaSave, FaTimes, FaLock, FaUserCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import useAuthStore from '../store/authStore';
import api from '../api/axios';

const UserProfile = () => {
    const { user } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [profileData, setProfileData] = useState({ fullName: '', email: '' });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({ fullName: user.fullName, email: user.email });
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/api/users/profile', profileData);
            setToast({ message: 'Profile updated successfully!', type: 'success' });
            setIsEditing(false);
            useAuthStore.getState().fetchCurrentUser();
        } catch (error) {
            setToast({ message: error.response?.data?.message || 'Update failed', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword.length < 6) {
            setToast({ message: 'Password must be at least 6 characters', type: 'error' });
            return;
        }

        setLoading(true);
        try {
            await api.put('/api/users/password', passwordData);
            setToast({ message: 'Password changed successfully!', type: 'success' });
            setPasswordData({ currentPassword: '', newPassword: '' });
            setIsChangingPassword(false);
        } catch (error) {
            setToast({ message: error.response?.data?.message || 'Password change failed', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Header with Avatar */}
                <div className="flex items-center gap-6 mb-10">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pitch-green to-emerald-600 flex items-center justify-center shadow-xl">
                            <FaUserCircle className="text-5xl text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900"></div>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-1">{user?.fullName}</h1>
                        <p className="text-slate-400 text-lg">{user?.email}</p>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
                    {/* Profile Information Section */}
                    <div className="p-8 border-b border-slate-700/50">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Profile Details</h2>
                            {!isEditing && !isChangingPassword && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-5 py-2.5 bg-pitch-green/10 hover:bg-pitch-green/20 text-pitch-green border border-pitch-green/30 rounded-xl font-medium flex items-center gap-2 transition-all"
                                >
                                    <FaEdit /> Edit
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleUpdateProfile}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pitch-green focus:border-transparent outline-none transition-all"
                                            value={profileData.fullName}
                                            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-slate-900/40 rounded-xl text-slate-200 font-medium">
                                            {user?.fullName}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pitch-green focus:border-transparent outline-none transition-all"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-slate-900/40 rounded-xl text-slate-200 font-medium">
                                            {user?.email}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">Account Role</label>
                                    <div className="px-4 py-3 bg-slate-900/40 rounded-xl">
                                        <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${user?.role === 'admin'
                                                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                                                : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                                            }`}>
                                            {user?.role}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">Account Status</label>
                                    <div className="px-4 py-3 bg-slate-900/40 rounded-xl">
                                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${user?.status === 'active'
                                                ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                                : 'bg-red-500/20 text-red-300 border border-red-400/30'
                                            }`}>
                                            {user?.status === 'active' ? <FaCheckCircle /> : <FaTimesCircle />}
                                            {user?.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700/50">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3 bg-pitch-green hover:bg-emerald-600 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-emerald-500/20"
                                    >
                                        <FaSave /> Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all flex items-center gap-2"
                                    >
                                        <FaTimes /> Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Password Section */}
                    <div className="p-8 bg-slate-900/20">
                        {!isChangingPassword ? (
                            <div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Password & Security</h3>
                                        <p className="text-slate-400 text-sm">Update your password to keep your account secure</p>
                                    </div>
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsChangingPassword(true)}
                                            className="px-5 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl font-medium flex items-center gap-2 transition-all"
                                        >
                                            <FaLock /> Change Password
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleChangePassword}>
                                <h3 className="text-xl font-bold text-white mb-6">Change Password</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-300 mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            placeholder="Enter current password"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-300 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            placeholder="Enter new password (min. 6 characters)"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/20"
                                    >
                                        <FaSave /> Update Password
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsChangingPassword(false);
                                            setPasswordData({ currentPassword: '', newPassword: '' });
                                        }}
                                        className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all flex items-center gap-2"
                                    >
                                        <FaTimes /> Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default UserProfile;
