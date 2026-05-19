import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
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

    localStorage.setItem(
      'user',
      JSON.stringify(formData)
    );

    toast.success('Signup successful');

    navigate('/login');
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
            Create your account to continue.
          </p>
        </div>

        {/* Title */}
        <h2 className="text-5xl font-bold text-white text-center mb-12">
          Create account
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
              placeholder="flow177@test.local"
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
            Sign up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-10">
          <Link
            to="/login"
            className="text-teal-500 text-2xl font-semibold hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;