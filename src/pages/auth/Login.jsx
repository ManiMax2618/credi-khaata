import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      
      if (success) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid email or password.');
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
            <p className="text-gray-500 dark:text-gray-400 mt-2">Demo auth — stored locally only.</p>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-center">Welcome back</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:border-teal-500"
                placeholder="nobody@example.com"
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
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              No account?{' '}
              <Link to="/signup" className="text-teal-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-500 mt-8">
            Tip: sign up once, then use the same credentials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;