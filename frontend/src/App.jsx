import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import CarDetails from './pages/CarDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import BottomNav from './components/Common/BottomNav';
import { AuthProvider, useAuth } from './context/AuthContext';

const AnimatedRoutes = () => {
  const { loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname + location.search}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans pb-24 lg:pb-0">
          <div className="max-w-7xl mx-auto">
            <AnimatedRoutes />
          </div>
          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
