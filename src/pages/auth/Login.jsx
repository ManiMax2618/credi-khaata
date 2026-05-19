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
      localStorage.getItem('registeredUser')
    );

    if (
      savedUser &&
      savedUser.email === formData.email &&
      savedUser.password === formData.password
    ) {
      // IMPORTANT
      localStorage.setItem(
        'user',
        JSON.stringify(savedUser)
      );

      toast.success('Login successful');

      navigate('/');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-500">
            CrediKhaata
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Manage customer credit easily.
          </p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-2xl font-semibold transition-all"
          >
            Login
          </button>
        </form>

        {/* Signup */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="text-teal-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;