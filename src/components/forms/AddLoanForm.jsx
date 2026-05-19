import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const AddLoanForm = ({ onSave }) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    item: '',
    amount: '',
    dueDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.item ||
      !formData.amount ||
      !formData.dueDate
    ) {
      alert('All fields are required!');
      return;
    }

    onSave({
      item: formData.item,
      amount: parseInt(formData.amount),
      dueDate: formData.dueDate,
      date: new Date()
        .toISOString()
        .split('T')[0]
    });

    // Reset form
    setFormData({
      item: '',
      amount: '',
      dueDate: ''
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Item */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Item sold
        </label>

        <input
          type="text"
          name="item"
          value={formData.item}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-teal-500 ${
            isDark
              ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          placeholder="Rice bag"
          required
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Amount (₹)
        </label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-teal-500 ${
            isDark
              ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          placeholder="5000"
          required
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Due date
        </label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          style={{
            colorScheme: isDark
              ? 'dark'
              : 'light'
          }}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-teal-500 ${
            isDark
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl font-medium mt-2"
      >
        Add Loan
      </button>
    </form>
  );
};

export default AddLoanForm;