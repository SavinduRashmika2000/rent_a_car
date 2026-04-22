import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Shield, User as UserIcon, Mail, Phone, Lock, 
  ArrowLeft, Users, Settings, ToggleLeft, ToggleRight, Edit2, Check, X,
  Car as CarIcon, LayoutDashboard, Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/Common/PageTransition';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mainSection, setMainSection] = useState('users'); // 'users' or 'cars'
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
    role: 'CUSTOMER'
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

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Use the appropriate role based on activeTab
      const signupData = { ...formData, role: activeTab === 'admins' ? 'ADMIN' : 'CUSTOMER' };
      
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: `New ${activeTab.slice(0, -1)} registered successfully!` });
        setFormData({ name: '', email: '', phone: '', password: '', role: 'CUSTOMER' });
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
        <div className="max-w-7xl mx-auto">
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
                <p className="text-sm text-gray-500">System control and resource management</p>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
              <button
                onClick={() => setMainSection('users')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${mainSection === 'users' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Users size={18} />
                User Management
              </button>
              <button
                onClick={() => setMainSection('cars')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${mainSection === 'cars' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <CarIcon size={18} />
                Car Inventory
              </button>
            </div>
          </motion.div>

          {mainSection === 'users' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form & Sub-tabs */}
              <div className="lg:col-span-4 space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">
                      Add New {activeTab === 'customers' ? 'Customer' : 'Admin'}
                    </h3>
                    <div className="flex gap-1 bg-gray-50 p-1 rounded-xl">
                      <button 
                        onClick={() => setActiveTab('customers')}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'customers' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
                      >
                        CUSTOMER
                      </button>
                      <button 
                        onClick={() => setActiveTab('admins')}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'admins' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
                      >
                        ADMIN
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitUser} className="space-y-4">
                    <div className="relative">
                      <UserIcon size={16} className="absolute left-4 top-3.5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-3.5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-3.5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-3.5 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Password"
                      />
                    </div>
                    
                    {message.text && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`p-3 rounded-xl text-[11px] font-bold text-center ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                      >
                        {message.text}
                      </motion.div>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className={`w-full py-4 text-white rounded-2xl text-sm font-bold shadow-lg transition-all ${activeTab === 'customers' ? 'bg-blue-600 shadow-blue-100' : 'bg-gray-900 shadow-gray-100'} disabled:bg-gray-300`}
                    >
                      {loading ? 'Registering...' : `Add New ${activeTab === 'customers' ? 'Customer' : 'Admin'}`}
                    </motion.button>
                  </form>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-[2rem] border border-gray-100">
                    <p className="text-xs text-gray-400 font-bold mb-1">CUSTOMERS</p>
                    <p className="text-2xl font-black text-gray-900">{usersList.filter(u => u.role === 'CUSTOMER').length}</p>
                  </div>
                  <div className="bg-white p-5 rounded-[2rem] border border-gray-100">
                    <p className="text-xs text-gray-400 font-bold mb-1">ADMINS</p>
                    <p className="text-2xl font-black text-gray-900">{usersList.filter(u => u.role === 'ADMIN').length}</p>
                  </div>
                </div>
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
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {activeTab === 'customers' ? 'Customer Directory' : 'Administrative Team'}
                      </h3>
                      <p className="text-xs text-gray-400">Total of {filteredUsers.length} {activeTab} found</p>
                    </div>
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search users..." 
                        className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] text-gray-400 font-black uppercase tracking-[0.1em] bg-gray-50/50">
                          <th className="px-6 py-4">User Details</th>
                          <th className="px-6 py-4">Contact Info</th>
                          <th className="px-6 py-4">Account Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((u) => (
                          <tr key={u.id} className="group hover:bg-gray-50/80 transition-all">
                            <td className="px-6 py-5">
                              {editingUser?.id === u.id ? (
                                <input
                                  type="text"
                                  value={editingUser.name}
                                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold"
                                />
                              ) : (
                                <div className="flex items-center gap-3">
                                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm ${activeTab === 'customers' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-900'}`}>
                                    {u.name.substring(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900">{u.name}</p>
                                    <p className="text-[10px] font-black text-blue-600 tracking-wider">ID: #{u.id}</p>
                                  </div>
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
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Mail size={12} className="text-gray-400" />
                                    <span>{u.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                    <Phone size={12} />
                                    <span>{u.phone}</span>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-5">
                              <button
                                onClick={() => toggleStatus(u.id)}
                                disabled={actionLoading === u.id}
                                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black tracking-wider transition-all ${
                                  u.active 
                                    ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                                }`}
                              >
                                {u.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                                {u.active ? 'ACTIVE' : 'DISABLED'}
                              </button>
                            </td>
                            <td className="px-6 py-5 text-right">
                              {editingUser?.id === u.id ? (
                                <div className="flex justify-end gap-2">
                                  <button 
                                    onClick={handleUpdateUser}
                                    className="p-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-md shadow-green-100 transition-all"
                                  >
                                    <Check size={16} />
                                  </button>
                                  <button 
                                    onClick={() => setEditingUser(null)}
                                    className="p-2.5 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300 transition-all"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  onClick={() => handleEditClick(u)}
                                  className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-100 transition-all"
                                >
                                  <Edit2 size={16} />
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
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-12 text-center border border-dashed border-gray-200"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mx-auto mb-6">
                <CarIcon size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Car Inventory Management</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                This module is currently being finalized. Soon you will be able to add, edit, and remove vehicles from your fleet.
              </p>
              <button 
                onClick={() => setMainSection('users')}
                className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all"
              >
                Return to User Management
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
