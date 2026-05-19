import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const AddCustomerForm = ({
  onClose,
  onSave,
}) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);

    setFormData({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
        <div
          className={`w-full max-w-md rounded-3xl shadow-2xl p-6 ${
            isDark
              ? 'bg-gray-900'
              : 'bg-white'
          }`}
        >
          {/* Header */}
          <div className="mb-6">
            <h2
              className={`text-3xl font-bold ${
                isDark
                  ? 'text-white'
                  : 'text-gray-900'
              }`}
            >
              Add Customer
            </h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  isDark
                    ? 'text-gray-200'
                    : 'text-gray-700'
                }`}
              >
                Customer Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
                className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:border-teal-500 ${
                  isDark
                    ? 'bg-gray-950 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  isDark
                    ? 'text-gray-200'
                    : 'text-gray-700'
                }`}
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:border-teal-500 ${
                  isDark
                    ? 'bg-gray-950 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  isDark
                    ? 'text-gray-200'
                    : 'text-gray-700'
                }`}
              >
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                required
                className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:border-teal-500 ${
                  isDark
                    ? 'bg-gray-950 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              {/* Cancel */}
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-3 rounded-2xl font-semibold border transition-all ${
                  isDark
                    ? 'border-gray-700 text-white hover:bg-gray-800'
                    : 'border-gray-300 text-gray-800 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>

              {/* Save */}
              <button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-2xl font-semibold transition-all"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerForm;