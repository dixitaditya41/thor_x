import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaChevronLeft, FaChevronRight, FaUsers, FaUserCheck, FaUserSlash, FaUserShield } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../api/axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [modal, setModal] = useState(null);
    const [toast, setToast] = useState(null);
    const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, admins: 0 });

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/api/users?page=${page}&limit=10`);
            setUsers(data.users);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);

            // Calculate stats
            const total = data.users.length;
            const active = data.users.filter(u => u.status === 'active').length;
            const inactive = data.users.filter(u => u.status === 'inactive').length;
            const admins = data.users.filter(u => u.role === 'admin').length;
            setStats({ total, active, inactive, admins });
        } catch (error) {
            setToast({ message: 'Failed to fetch users', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, []);

    const handleActivate = async (userId) => {
        try {
            await api.put(`/api/users/${userId}/activate`);
            setToast({ message: 'User activated successfully', type: 'success' });
            fetchUsers(currentPage);
        } catch (error) {
            setToast({ message: 'Failed to activate user', type: 'error' });
        }
        setModal(null);
    };

    const handleDeactivate = async (userId) => {
        try {
            await api.put(`/api/users/${userId}/deactivate`);
            setToast({ message: 'User deactivated successfully', type: 'success' });
            fetchUsers(currentPage);
        } catch (error) {
            setToast({ message: 'Failed to deactivate user', type: 'error' });
        }
        setModal(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-slate-400 text-lg">Manage users and monitor system activity</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium mb-1">Total Users</p>
                                <p className="text-3xl font-bold text-white">{stats.total}</p>
                            </div>
                            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                <FaUsers className="text-2xl text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium mb-1">Active Users</p>
                                <p className="text-3xl font-bold text-white">{stats.active}</p>
                            </div>
                            <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center">
                                <FaUserCheck className="text-2xl text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium mb-1">Inactive Users</p>
                                <p className="text-3xl font-bold text-white">{stats.inactive}</p>
                            </div>
                            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center">
                                <FaUserSlash className="text-2xl text-red-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium mb-1">Administrators</p>
                                <p className="text-3xl font-bold text-white">{stats.admins}</p>
                            </div>
                            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center">
                                <FaUserShield className="text-2xl text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                    <div className="p-6 border-b border-slate-700/50">
                        <h2 className="text-2xl font-bold text-white">User Management</h2>
                        <p className="text-slate-400 text-sm mt-1">View and manage all registered users</p>
                    </div>

                    {loading ? (
                        <div className="p-12">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-900/50 border-b border-slate-700/50">
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Full Name</th>
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Email</th>
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Role</th>
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Created</th>
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        {users.map((user) => (
                                            <tr key={user._id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-white">{user.fullName}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-slate-300">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${user.role === 'admin'
                                                            ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                                                            : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${user.status === 'active'
                                                            ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                                            : 'bg-red-500/20 text-red-300 border border-red-400/30'
                                                        }`}>
                                                        {user.status === 'active' ? <FaCheckCircle /> : <FaTimesCircle />}
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.status === 'inactive' ? (
                                                        <button
                                                            onClick={() => setModal({ type: 'activate', user })}
                                                            className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg font-medium text-sm transition-all"
                                                        >
                                                            Activate
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => setModal({ type: 'deactivate', user })}
                                                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium text-sm transition-all"
                                                        >
                                                            Deactivate
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50 bg-slate-900/20">
                                <div className="text-sm text-slate-400">
                                    Showing page {currentPage} of {totalPages}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => fetchUsers(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg font-medium text-sm transition-all flex items-center gap-2 disabled:cursor-not-allowed"
                                    >
                                        <FaChevronLeft /> Previous
                                    </button>
                                    <button
                                        onClick={() => fetchUsers(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg font-medium text-sm transition-all flex items-center gap-2 disabled:cursor-not-allowed"
                                    >
                                        Next <FaChevronRight />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {modal && (
                <Modal
                    isOpen={true}
                    onClose={() => setModal(null)}
                    onConfirm={() =>
                        modal.type === 'activate'
                            ? handleActivate(modal.user._id)
                            : handleDeactivate(modal.user._id)
                    }
                    title={`${modal.type === 'activate' ? 'Activate' : 'Deactivate'} User`}
                    message={`Are you sure you want to ${modal.type} ${modal.user.fullName}?`}
                />
            )}

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default AdminDashboard;
