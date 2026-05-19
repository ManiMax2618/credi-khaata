import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem('user')
    );

    if (
      savedUser &&
      savedUser.email === formData.email &&
      savedUser.password === formData.password
    ) {
      localStorage.setItem(
        'isAuthenticated',
        true
      );

      toast.success('Login successful');

      navigate('/');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-5">
      <div className="w-full max-w-xl bg-gray-900 rounded-3xl p-10 border border-gray-800 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-teal-500">
            CrediKhaata
          </h1>

          <p className="text-gray-400 mt-4 text-xl">
            Demo auth — stored locally only.
          </p>
        </div>

        {/* Title */}
        <h2 className="text-5xl font-bold text-white text-center mb-12">
          Welcome back
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Email */}
          <div>
            <label className="block text-white text-xl font-medium mb-3">
              EMAIL
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nobody@example.com"
              required
              className="w-full px-6 py-5 rounded-2xl bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 text-xl"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-xl font-medium mb-3">
              PASSWORD
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-6 py-5 rounded-2xl bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 text-xl"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-2xl font-bold text-2xl transition-all"
          >
            Log in
          </button>
        </form>

        {/* Signup */}
        <p className="text-center text-gray-400 text-xl mt-10">
          No account?{' '}
          <Link
            to="/signup"
            className="text-teal-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-12 text-lg">
          Tip: sign up once, then use the same
          credentials.
        </p>
      </div>
    </div>
  );
};

export default Login;