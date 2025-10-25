import React, { useState } from 'react';
import { Calendar, Bell, Wallet, User, LogOut, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ currentUser, notifications, onLogout, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard', requiresAuth: true },
    { path: '/admin', label: 'Admin', requiresAuth: true, adminOnly: true }
  ];

  const filteredNavItems = navItems.filter(item => {
    if (!item.requiresAuth) return true;
    if (!currentUser) return false;
    if (item.adminOnly && currentUser.role !== 'admin') return false;
    return true;
  });

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 border-b border-blue-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Calendar className="w-8 h-8 text-white" />
            <span className="text-xl font-semibold text-white hidden sm:block">
              Hedera Events
            </span>
            <span className="text-xl font-semibold text-white sm:hidden">
              HE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition ${
                isActive('/')
                  ? 'text-white border-b-2 border-white pb-1'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Home
            </Link>
            
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition ${
                    isActive('/dashboard')
                      ? 'text-white border-b-2 border-white pb-1'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  User
                </Link>
                <Link
                  to="/admin"
                  className={`text-sm font-medium transition ${
                    isActive('/admin')
                      ? 'text-white border-b-2 border-white pb-1'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  Admin
                </Link>
              </>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <Bell className="w-5 h-5 text-blue-100 cursor-pointer hover:text-white transition" />
                  {notifications?.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </div>

                {/* Wallet Balance */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                  <Wallet className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">0 ℏ</span>
                </div>

                {/* Dashboard Navigation */}
                <button
                  onClick={() => onNavigate(currentUser?.role === 'admin' ? '/admin' : '/dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition"
                >
                  <User className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {currentUser?.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                  </span>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 text-blue-100 hover:text-white hover:bg-white/20 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-blue-100 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 rounded-lg text-sm font-medium transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-blue-100 hover:text-white hover:bg-white/20 rounded-lg transition"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-blue-700 py-4">
            <div className="space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive('/')
                      ? 'bg-white/20 text-white'
                      : 'text-blue-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Home
                </Link>
                {currentUser && (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                        isActive('/dashboard')
                          ? 'bg-white/20 text-white'
                          : 'text-blue-100 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      User
                    </Link>
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                        isActive('/admin')
                          ? 'bg-white/20 text-white'
                          : 'text-blue-100 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      Admin
                    </Link>
                  </>
                )}
              </div>

              {/* User Section */}
              {currentUser ? (
                <div className="border-t border-blue-700 pt-4 space-y-3">
                  {/* User Info */}
                  <div className="flex items-center gap-3 px-3 py-2 bg-white/20 rounded-lg">
                    <User className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-sm font-medium text-white">{currentUser.name}</div>
                      <div className="text-xs text-blue-100">{currentUser.role}</div>
                    </div>
                  </div>

                  {/* Wallet */}
                  <div className="flex items-center gap-3 px-3 py-2 bg-white/20 rounded-lg">
                    <Wallet className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium text-white">Balance: 0 ℏ</span>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center gap-3 px-3 py-2 bg-white/20 rounded-lg">
                    <Bell className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium text-white">
                      {notifications?.length || 0} notifications
                    </span>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-blue-100 hover:text-white hover:bg-white/20 rounded-lg transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-blue-700 pt-4 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 bg-white hover:bg-blue-50 text-blue-600 rounded-lg text-sm font-medium transition text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;