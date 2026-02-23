import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Home, FileText, User, LogIn, UserPlus, BookOpen, Briefcase, FilePlus, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/my-profile', label: 'My Profile', icon: User },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/cv-generator', label: 'CV Generator', icon: FilePlus },
    { path: '/resume', label: 'Resume', icon: FileText },
    { path: '/blog', label: 'Blog', icon: BookOpen },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">My Career Plot</span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-dark-300 hover:text-dark-50 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-white/10">
              {user ? (
                <>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-2 text-dark-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm">{user.displayName || user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg flex items-center space-x-2 text-dark-300 hover:text-dark-50 hover:bg-white/5 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg flex items-center space-x-2 text-dark-300 hover:text-dark-50 hover:bg-white/5 transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white transition-all duration-300"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
