import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Shield, User as UserIcon, Mail, Phone, Lock, 
  ArrowLeft, Users, Settings, ToggleLeft, ToggleRight, Edit2, Check, X,
  Car as CarIcon, Search, Plus, MapPin, DollarSign, Star,
  Trash2, Calendar, ClipboardList, Clock, CheckCircle2, XCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/Common/PageTransition';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mainSection, setMainSection] = useState('users'); // 'users', 'cars', 'reservations'
  const [activeTab, setActiveTab] = useState('customers'); // 'admins' or 'customers'
  const [usersList, setUsersList] = useState([]);
  const [carsList, setCarsList] = useState([]);
  const [reservationsList, setReservationsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingCar, setEditingCar] = useState(null);
  const [editingReservation, setEditingReservation] = useState(null);
  const [userSearch, setUserSearch] = useState('');
  const [carSearch, setCarSearch] = useState('');
  const [resSearch, setResSearch] = useState('');
  
  const [userFormData, setUserFormData] = useState({
    name: '', email: '', phone: '', password: '', role: 'CUSTOMER'
  });
  const [carFormData, setCarFormData] = useState({
    name: '', type: 'SUV', transmission: 'Automatic', fuel: 'Petrol',
    seats: 5, location: '', price: '', originalPrice: '', rating: 4.5, image: '', available: true
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Protected route check
  if (!user || !user.roles?.includes('ROLE_ADMIN')) {
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
    fetchCars();
    fetchReservations();
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
    } catch (err) { console.error(err); }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cars');
      if (response.ok) {
        const data = await response.json();
        setCarsList(data);
      }
    } catch (err) { console.error(err); }
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/reservations', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setReservationsList(data);
      }
    } catch (err) { console.error(err); }
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const signupData = { ...userFormData, role: activeTab === 'admins' ? 'ADMIN' : 'CUSTOMER' };
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(signupData),
      });
      if (response.ok) {
        setUserFormData({ name: '', email: '', phone: '', password: '', role: 'CUSTOMER' });
        fetchUsers();
        setMessage({ type: 'success', text: 'User added successfully!' });
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
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
      if (response.ok) { setEditingUser(null); fetchUsers(); }
    } catch (err) { console.error(err); } finally { setActionLoading(null); }
  };

  const handleSubmitCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/cars', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(carFormData),
      });
      if (response.ok) {
        setCarFormData({ name: '', type: 'SUV', transmission: 'Automatic', fuel: 'Petrol', seats: 5, location: '', price: '', originalPrice: '', rating: 4.5, image: '', available: true });
        fetchCars();
        setMessage({ type: 'success', text: 'Car added successfully!' });
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleUpdateCar = async () => {
    setActionLoading(editingCar.id);
    try {
      const response = await fetch(`http://localhost:8080/api/cars/${editingCar.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editingCar),
      });
      if (response.ok) { setEditingCar(null); fetchCars(); }
    } catch (err) { console.error(err); } finally { setActionLoading(null); }
  };

  const handleUpdateReservation = async () => {
    setActionLoading(editingReservation.id);
    try {
      const response = await fetch(`http://localhost:8080/api/reservations/${editingReservation.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editingReservation),
      });
      if (response.ok) { setEditingReservation(null); fetchReservations(); }
    } catch (err) { console.error(err); } finally { setActionLoading(null); }
  };

  // Status Icons/Colors
  const getStatusStyle = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-50 text-green-700 border-green-100';
      case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'CANCELLED': return 'bg-red-50 text-red-700 border-red-100';
      case 'COMPLETED': return 'bg-blue-50 text-blue-700 border-blue-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const filteredUsers = usersList
    .filter(u => activeTab === 'admins' ? u.role === 'ADMIN' : u.role === 'CUSTOMER')
    .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()));

  const filteredCars = carsList.filter(c => c.name.toLowerCase().includes(carSearch.toLowerCase()));

  const filteredReservations = reservationsList.filter(r => 
    r.user.name.toLowerCase().includes(resSearch.toLowerCase()) || 
    r.car.name.toLowerCase().includes(resSearch.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
            <div className="flex items-center gap-4">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate('/')} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-900"><ArrowLeft size={20} /></motion.button>
              <div><h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1><p className="text-sm text-gray-500">Fleet, Users & Reservations</p></div>
            </div>
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
              {[
                { id: 'users', icon: Users, label: 'Users' },
                { id: 'cars', icon: CarIcon, label: 'Cars' },
                { id: 'reservations', icon: ClipboardList, label: 'Reservations' }
              ].map(btn => (
                <button key={btn.id} onClick={() => setMainSection(btn.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${mainSection === btn.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:text-gray-700'}`}>
                  <btn.icon size={18} />{btn.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Users Section */}
          {mainSection === 'users' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Add {activeTab === 'customers' ? 'Customer' : 'Admin'}</h3>
                    <div className="flex gap-1 bg-gray-50 p-1 rounded-xl">
                      <button onClick={() => setActiveTab('customers')} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'customers' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}>CUSTOMER</button>
                      <button onClick={() => setActiveTab('admins')} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'admins' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}>ADMIN</button>
                    </div>
                  </div>
                  <form onSubmit={handleSubmitUser} className="space-y-4">
                    <input type="text" placeholder="Full Name" required value={userFormData.name} onChange={e => setUserFormData({...userFormData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" />
                    <input type="email" placeholder="Email" required value={userFormData.email} onChange={e => setUserFormData({...userFormData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" />
                    <input type="tel" placeholder="Phone" required value={userFormData.phone} onChange={e => setUserFormData({...userFormData, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" />
                    <input type="password" placeholder="Password" required value={userFormData.password} onChange={e => setUserFormData({...userFormData, password: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" />
                    <button disabled={loading} className="w-full py-3.5 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg disabled:bg-gray-300">{loading ? 'Adding...' : 'Create Account'}</button>
                  </form>
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{activeTab === 'customers' ? 'Customer Directory' : 'Admin Team'}</h3>
                    <div className="relative"><Search size={16} className="absolute left-3 top-2.5 text-gray-400" /><input type="text" placeholder="Search..." value={userSearch} onChange={e => setUserSearch(e.target.value)} className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs" /></div>
                  </div>
                  <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="text-[10px] text-gray-400 font-black uppercase tracking-wider bg-gray-50/50"><th className="px-6 py-4">User</th><th className="px-6 py-4">Contact</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-gray-50">{filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50/80 transition-all"><td className="px-6 py-5">{editingUser?.id === u.id ? <input type="text" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm font-bold" /> : <div className="flex items-center gap-3"><div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${activeTab === 'customers' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-900'}`}>{u.name.substring(0, 2).toUpperCase()}</div><span className="font-bold text-gray-900">{u.name}</span></div>}</td><td className="px-6 py-5 text-xs text-gray-500">{editingUser?.id === u.id ? <div className="space-y-2"><input type="email" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} className="w-full px-2 py-1 border rounded" /><input type="tel" value={editingUser.phone} onChange={e => setEditingUser({...editingUser, phone: e.target.value})} className="w-full px-2 py-1 border rounded" /></div> : <div className="space-y-0.5"><p>{u.email}</p><p>{u.phone}</p></div>}</td><td className="px-6 py-5">{editingUser?.id === u.id ? <button onClick={() => setEditingUser({...editingUser, active: !editingUser.active})} className={`px-4 py-1.5 rounded-xl text-[10px] font-black ${editingUser.active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{editingUser.active ? 'ACTIVE' : 'DISABLED'}</button> : <div className={`inline-flex px-4 py-1.5 rounded-xl text-[10px] font-black ${u.active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{u.active ? 'ACTIVE' : 'DISABLED'}</div>}</td><td className="px-6 py-5 text-right">{editingUser?.id === u.id ? <div className="flex justify-end gap-2"><button onClick={handleUpdateUser} className="p-2 bg-green-600 text-white rounded-lg"><Check size={14} /></button><button onClick={() => setEditingUser(null)} className="p-2 bg-gray-200 text-gray-600 rounded-lg"><X size={14} /></button></div> : <button onClick={() => setEditingUser({...u})} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit2 size={16} /></button>}</td></tr>
                  ))}</tbody></table></div>
                </div>
              </div>
            </div>
          )}

          {/* Cars Section */}
          {mainSection === 'cars' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Add Vehicle</h3>
                  <form onSubmit={handleSubmitCar} className="space-y-4">
                    <input type="text" placeholder="Model Name" required value={carFormData.name} onChange={e => setCarFormData({...carFormData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="number" placeholder="Price/Day" required value={carFormData.price} onChange={e => setCarFormData({...carFormData, price: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" />
                      <input type="text" placeholder="Location" required value={carFormData.location} onChange={e => setCarFormData({...carFormData, location: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" />
                    </div>
                    <div 
                      onDragOver={e => e.preventDefault()} 
                      onDrop={e => { e.preventDefault(); const url = e.dataTransfer.getData('text'); if(url) setCarFormData({...carFormData, image: url}); }}
                      className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center bg-gray-50/50"
                    >
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Drag Image URL Here</p>
                      <input type="text" placeholder="Or Paste URL" value={carFormData.image} onChange={e => setCarFormData({...carFormData, image: e.target.value})} className="w-full bg-white border border-gray-100 rounded-lg px-3 py-2 text-xs" />
                    </div>
                    <button className="w-full py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100">Add to Inventory</button>
                  </form>
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Fleet Inventory</h3>
                    <div className="relative"><Search size={16} className="absolute left-3 top-2.5 text-gray-400" /><input type="text" placeholder="Search cars..." value={carSearch} onChange={e => setCarSearch(e.target.value)} className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs" /></div>
                  </div>
                  <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="text-[10px] text-gray-400 font-black uppercase bg-gray-50/50"><th className="px-6 py-4">Car</th><th className="px-6 py-4">Specs</th><th className="px-6 py-4">Availability</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-gray-50">{filteredCars.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50/80 transition-all"><td className="px-6 py-5">{editingCar?.id === c.id ? <input type="text" value={editingCar.name} onChange={e => setEditingCar({...editingCar, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm font-bold" /> : <div className="flex items-center gap-4"><img src={c.image} className="w-14 h-9 object-cover rounded-lg bg-gray-100 shadow-sm" /><span className="font-bold text-gray-900">{c.name}</span></div>}</td><td className="px-6 py-5 text-xs text-gray-500">{editingCar?.id === c.id ? <div className="flex gap-2"><input type="number" value={editingCar.price} onChange={e => setEditingCar({...editingCar, price: e.target.value})} className="w-16 p-1 border rounded" /><input type="text" value={editingCar.location} onChange={e => setEditingCar({...editingCar, location: e.target.value})} className="w-20 p-1 border rounded" /></div> : <div className="space-y-0.5"><p className="font-bold text-gray-900">${c.price}/day</p><p>{c.location}</p></div>}</td><td className="px-6 py-5">{editingCar?.id === c.id ? <button onClick={() => setEditingCar({...editingCar, available: !editingCar.available})} className={`px-4 py-1.5 rounded-xl text-[10px] font-black ${editingCar.available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{editingCar.available ? 'AVAILABLE' : 'OFFLINE'}</button> : <div className={`inline-flex px-4 py-1.5 rounded-xl text-[10px] font-black ${c.available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{c.available ? 'AVAILABLE' : 'OFFLINE'}</div>}</td><td className="px-6 py-5 text-right">{editingCar?.id === c.id ? <div className="flex justify-end gap-2"><button onClick={handleUpdateCar} className="p-2 bg-green-600 text-white rounded-lg"><Check size={14} /></button><button onClick={() => setEditingCar(null)} className="p-2 bg-gray-200 text-gray-600 rounded-lg"><X size={14} /></button></div> : <button onClick={() => setEditingCar({...c})} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit2 size={16} /></button>}</td></tr>
                  ))}</tbody></table></div>
                </div>
              </div>
            </div>
          )}

          {/* Reservations Section */}
          {mainSection === 'reservations' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <div><h3 className="font-bold text-gray-900">Manage Reservations</h3><p className="text-xs text-gray-400">Track bookings and updates status</p></div>
                <div className="relative"><Search size={16} className="absolute left-3 top-2.5 text-gray-400" /><input type="text" placeholder="Search by user or car..." value={resSearch} onChange={e => setResSearch(e.target.value)} className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs" /></div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead><tr className="text-[10px] text-gray-400 font-black uppercase tracking-wider bg-gray-50/50"><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Vehicle</th><th className="px-6 py-4">Duration</th><th className="px-6 py-4">Total</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredReservations.map(r => (
                      <tr key={r.id} className="hover:bg-gray-50/80 transition-all">
                        <td className="px-6 py-5"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center font-bold text-[10px] uppercase">{r.user.name.substring(0, 2)}</div><div className="text-xs"><p className="font-bold text-gray-900">{r.user.name}</p><p className="text-[9px] text-gray-400">{r.user.email}</p></div></div></td>
                        <td className="px-6 py-5"><div className="flex items-center gap-3"><img src={r.car.image} className="w-10 h-6 object-cover rounded shadow-sm" /><p className="text-xs font-bold text-gray-900">{r.car.name}</p></div></td>
                        <td className="px-6 py-5 text-xs text-gray-600 font-medium">
                          <div className="flex items-center gap-2"><Calendar size={12} className="text-gray-400" /><span>{r.startDate} to {r.endDate}</span></div>
                        </td>
                        <td className="px-6 py-5 text-xs font-black text-gray-900">${r.totalPrice}</td>
                        <td className="px-6 py-5">
                          {editingReservation?.id === r.id ? (
                            <select value={editingReservation.status} onChange={e => setEditingReservation({...editingReservation, status: e.target.value})} className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold">
                              <option>PENDING</option><option>CONFIRMED</option><option>COMPLETED</option><option>CANCELLED</option>
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest border ${getStatusStyle(r.status)}`}>{r.status}</span>
                          )}
                        </td>
                        <td className="px-6 py-5 text-right">
                          {editingReservation?.id === r.id ? (
                            <div className="flex justify-end gap-2"><button onClick={handleUpdateReservation} className="p-2 bg-green-600 text-white rounded-lg"><Check size={14} /></button><button onClick={() => setEditingReservation(null)} className="p-2 bg-gray-200 text-gray-600 rounded-lg"><X size={14} /></button></div>
                          ) : (
                            <button onClick={() => setEditingReservation({...r})} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit2 size={16} /></button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
