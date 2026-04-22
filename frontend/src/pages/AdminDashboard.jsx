import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Shield, User as UserIcon, Mail, Phone, Lock, 
  ArrowLeft, Users, Settings, ToggleLeft, ToggleRight, Edit2, Check, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/Common/PageTransition';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('customers'); // 'admins' or 'customers'
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'ADMIN'
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Protected route check
  if (!user || !user.roles.includes('ROLE_ADMIN')) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-5 text-center">
        <Shield size={64} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">Only administrators can access this page.</p>
        <button onClick={() => navigate('/')} className="text-blue-600 font-bold hover:underline">Back to Home</button>
      </div>
    );
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsersList(data);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ ...formData, role: 'ADMIN' }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'New admin registered successfully!' });
        setFormData({ name: '', email: '', phone: '', password: '', role: 'ADMIN' });
        fetchUsers();
      } else {
        const msg = await response.text();
        setMessage({ type: 'error', text: msg || 'Registration failed.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId) => {
    setActionLoading(userId);
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}/toggle-status`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleEditClick = (u) => {
    setEditingUser({ ...u });
  };

  const handleUpdateUser = async () => {
    setActionLoading(editingUser.id);
    try {
      const response = await fetch(`http://localhost:8080/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editingUser),
      });
      if (response.ok) {
        setEditingUser(null);
        fetchUsers();
      }
    } catch (err) {
      console.error('Failed to update user:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = usersList.filter(u => 
    activeTab === 'admins' ? u.role === 'ADMIN' : u.role === 'CUSTOMER'
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6"
          >
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/')}
                className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-900"
              >
                <ArrowLeft size={20} />
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Manage users and administrative team</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
              <button
                onClick={() => setActiveTab('customers')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'customers' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Customers
              </button>
              <button
                onClick={() => setActiveTab('admins')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'admins' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Admins
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Form/Stats */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-100">
                  <UserPlus size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Add New Admin</h3>
                <form onSubmit={handleSubmitAdmin} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Email Address"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Phone Number"
                  />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Password"
                  />
                  {message.text && (
                    <p className={`text-xs font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full py-3.5 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg disabled:bg-gray-400"
                  >
                    {loading ? 'Processing...' : 'Create Admin Account'}
                  </motion.button>
                </form>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-600 p-6 rounded-[2.5rem] shadow-lg shadow-blue-200 text-white"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl"><Users size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold">{usersList.length}</h4>
                    <p className="text-xs text-blue-100">Total Users</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100 leading-relaxed">
                  As an admin, you can manage all system users, including customers and other administrators.
                </p>
              </motion.div>
            </div>

            {/* Right Column: User List */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">
                    {activeTab === 'customers' ? 'Customer Directory' : 'Admin Team'}
                  </h3>
                  <div className="p-2 bg-gray-50 rounded-lg"><Settings size={18} className="text-gray-400" /></div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-xs text-gray-400 font-bold uppercase tracking-wider bg-gray-50/50">
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-5">
                            {editingUser?.id === u.id ? (
                              <input
                                type="text"
                                value={editingUser.name}
                                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm"
                              />
                            ) : (
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-sm uppercase">
                                  {u.name.substring(0, 2)}
                                </div>
                                <span className="font-bold text-gray-900">{u.name}</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            {editingUser?.id === u.id ? (
                              <div className="space-y-2">
                                <input
                                  type="email"
                                  value={editingUser.email}
                                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                  className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                                />
                                <input
                                  type="tel"
                                  value={editingUser.phone}
                                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                  className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                                />
                              </div>
                            ) : (
                              <div className="text-xs space-y-1">
                                <p className="text-gray-600">{u.email}</p>
                                <p className="text-gray-400 font-medium">{u.phone}</p>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <button
                              onClick={() => toggleStatus(u.id)}
                              disabled={actionLoading === u.id}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                                u.active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                              }`}
                            >
                              {u.active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                              {u.active ? 'ACTIVE' : 'INACTIVE'}
                            </button>
                          </td>
                          <td className="px-6 py-5 text-right">
                            {editingUser?.id === u.id ? (
                              <div className="flex justify-end gap-2">
                                <button 
                                  onClick={handleUpdateUser}
                                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                  <Check size={14} />
                                </button>
                                <button 
                                  onClick={() => setEditingUser(null)}
                                  className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => handleEditClick(u)}
                                className="p-2 bg-gray-100 text-gray-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                              >
                                <Edit2 size={14} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
