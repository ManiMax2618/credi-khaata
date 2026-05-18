import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold">
              C
            </div>
            <div>
              <h1 className="font-semibold text-xl tracking-tight">CrediKhaata</h1>
              <p className="text-xs text-gray-500 -mt-1">Credit Ledger</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:block text-sm">
                <span className="text-gray-500">Logged in as:</span>{' '}
                <span className="font-medium">{user.email}</span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;