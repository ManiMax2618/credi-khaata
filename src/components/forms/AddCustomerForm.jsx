import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

const AddCustomerForm = ({ onClose, onSave }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Name and Email are required!');
      return;
    }

    onSave(formData);
    toast.success('Customer added successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-3xl ${isDark ? 'bg-gray-900' : 'bg-white'} p-8`}>
        <h2 className="text-2xl font-semibold mb-6">Add Customer</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-teal-500"
              placeholder="Ravi Kumar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-teal-500"
              placeholder="ravi@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-teal-500"
              placeholder="9876543210"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 border border-gray-300 dark:border-gray-700 rounded-2xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-medium transition"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerForm;