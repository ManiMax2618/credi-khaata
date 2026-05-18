import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (password.length < 4) {
        toast.error('Password must be at least 4 characters.');
        setLoading(false);
        return;
      }

      const success = signup(email, password);
      
      if (success) {
        toast.success('Account created. You are signed in.');
        navigate('/');
      } else {
        toast.error('Please fill all fields correctly.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md px-6 py-12">
        <div className={`rounded-2xl shadow-xl p-8 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal-600">CrediKhaata</h1>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-center">Create account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:border-teal-500"
                placeholder="flow177...@test.local"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:border-teal-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-medium py-3.5 rounded-xl transition-all duration-200 text-lg"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link 
              to="/login" 
              className="text-teal-600 hover:underline font-medium"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;